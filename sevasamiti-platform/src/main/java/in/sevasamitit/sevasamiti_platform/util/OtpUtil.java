package in.sevasamitit.sevasamiti_platform.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.SecureRandom;
import java.util.Random;

public class OtpUtil {

    private static final PasswordEncoder encoder = new BCryptPasswordEncoder();
    private static final Random random = new SecureRandom();

    // generate 6-digit numeric OTP
    public static String generateNumericOtp() {
        int code = 100000 + random.nextInt(900000); // 100000-999999
        return String.valueOf(code);
    }

    public static String hashOtp(String otp) {
        return encoder.encode(otp);
    }

    public static boolean matches(String rawOtp, String hashed) {
        return encoder.matches(rawOtp, hashed);
    }
}
