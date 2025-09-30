package in.sevasamitit.sevasamiti_platform.controller;

import in.sevasamitit.sevasamiti_platform.dto.SignupRequest;
import in.sevasamitit.sevasamiti_platform.dto.SignupResponse;
import in.sevasamitit.sevasamiti_platform.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        try { 
            userService.registerNewUser(request);
            return ResponseEntity.ok(new SignupResponse(true, "Signup successful. Please verify email/phone."));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(new SignupResponse(false, ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(new SignupResponse(false, "Server error"));
        }
    }
}

