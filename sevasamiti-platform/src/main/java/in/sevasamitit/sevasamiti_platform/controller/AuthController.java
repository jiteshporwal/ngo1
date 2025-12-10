package in.sevasamitit.sevasamiti_platform.controller;

import in.sevasamitit.sevasamiti_platform.dto.SignupRequest;
import in.sevasamitit.sevasamiti_platform.dto.SignupResponse;
import in.sevasamitit.sevasamiti_platform.entity.Users;
import in.sevasamitit.sevasamiti_platform.service.EmailService;
import in.sevasamitit.sevasamiti_platform.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final EmailService emailService;

    // inject EmailService along with UserService
    public AuthController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    // signup: saves user AND auto-sends OTP to user's email
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        try {
            // register and get saved user
            Users saved = userService.registerNewUser(request);

            // send OTP to the saved user's email (async if you want)
            emailService.generateAndSendOtpForUser(saved.getUserId());

            // return success + userId so caller can reference for verify
            SignupResponse res = new SignupResponse(true,
                    "Signup successful. OTP sent to email. Please verify.",
                    saved.getUserId()); // add userId in response DTO (update DTO below)
            return ResponseEntity.ok(res);

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(new SignupResponse(false, ex.getMessage(), null));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(new SignupResponse(false, "Server error", null));
        }
    }

    // request to resend OTP (optional)
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestParam(required = false) Long userId,
                                     @RequestBody(required = false) SendOtpRequest body) {
        Long id = userId != null ? userId : (body != null ? body.getUserId() : null);
        if (id == null) return ResponseEntity.badRequest().body("{\"success\":false,\"message\":\"userId required\"}");
        emailService.generateAndSendOtpForUser(id);
        return ResponseEntity.ok("{\"success\":true,\"message\":\"OTP sent\"}");
    }

    // verify the OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest req) {
        try {
            boolean ok = emailService.verifyOtpForUser(req.getUserId(), req.getOtp());
            if (ok) return ResponseEntity.ok("{\"success\":true,\"message\":\"Email verified\"}");
            else return ResponseEntity.badRequest().body("{\"success\":false,\"message\":\"Invalid OTP\"}");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("{\"success\":false,\"message\":\"" + ex.getMessage() + "\"}");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("{\"success\":false,\"message\":\"Server error\"}");
        }
    }

    // DTOs used in controller
    public static class SendOtpRequest {
        private Long userId;
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
    }

    public static class VerifyOtpRequest {
        private Long userId;
        private String otp;
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getOtp() { return otp; }
        public void setOtp(String otp) { this.otp = otp; }
    }
}
