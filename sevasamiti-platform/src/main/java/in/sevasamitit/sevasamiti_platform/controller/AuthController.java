package in.sevasamitit.sevasamiti_platform.controller;

import in.sevasamitit.sevasamiti_platform.dto.ApiResponse;
import in.sevasamitit.sevasamiti_platform.dto.JwtAuthenticationResponse;
import in.sevasamitit.sevasamiti_platform.dto.LoginRequest;
import in.sevasamitit.sevasamiti_platform.dto.SignupRequest;
import in.sevasamitit.sevasamiti_platform.entity.Users;
import in.sevasamitit.sevasamiti_platform.service.EmailService;
import in.sevasamitit.sevasamiti_platform.service.UserPrincipal; // Add this import
import in.sevasamitit.sevasamiti_platform.service.UserService;
import in.sevasamitit.sevasamiti_platform.util.JwtTokenProvider;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank; // Add this import
import jakarta.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenProvider tokenProvider;
    private final EmailService emailService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtTokenProvider tokenProvider, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.emailService = emailService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("Attempting to authenticate user: {}", loginRequest.getUsername());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);
            logger.info("User {} authenticated successfully. Returning JWT.", loginRequest.getUsername());
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for user {}: {}", loginRequest.getUsername(), e.getMessage());
            return new ResponseEntity<>(new ApiResponse(false, "Authentication failed: " + e.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        logger.info("Attempting to register user with email: {}", signUpRequest.getEmail());
        try {
            Users result = userService.registerNewUser(signUpRequest); // Sets verifiedEmail to false by default

            emailService.generateAndSendOtpForUser(result.getUserId());

            logger.info("User {} registered successfully. OTP sent.", signUpRequest.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body(new SignupResponse(true, "User registered successfully. OTP sent to email. Please verify.", result.getUserId()));

        } catch (IllegalArgumentException ex) {
            logger.error("Registration failed for user {}: {}", signUpRequest.getEmail(), ex.getMessage());
            return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpRequest req) {
        try {
            emailService.generateAndSendOtpForUser(req.getUserId());
            return ResponseEntity.ok(new ApiResponse(true, "OTP sent successfully."));
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody VerifyOtpRequest req) {
        try {
            boolean verified = emailService.verifyOtpForUser(req.getUserId(), req.getOtp());
            if (verified) {
                // If OTP is verified, authenticate the user and generate a JWT
                UserPrincipal userPrincipal = (UserPrincipal) userService.loadUserById(req.getUserId());
                Authentication authentication = new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = tokenProvider.generateTokenFromUsername(userPrincipal.getUsername());
                return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
            } else {
                return new ResponseEntity<>(new ApiResponse(false, "Invalid OTP"), HttpStatus.BAD_REQUEST);
            }
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    
    // DTOs used in controller
    public static class SignupResponse {
        private boolean success;
        private String message;
        private Long userId;

        public SignupResponse(boolean success, String message, Long userId) {
            this.success = success;
            this.message = message;
            this.userId = userId;
        }

        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
    }

    public static class SendOtpRequest {
        @NotNull
        private Long userId;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
    }

    public static class VerifyOtpRequest {
        @NotNull
        private Long userId;
        @NotBlank
        private String otp;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getOtp() { return otp; }
        public void setOtp(String otp) { this.otp = otp; }
    }
}
