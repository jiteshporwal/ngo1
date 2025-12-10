package in.sevasamitit.sevasamiti_platform.service;

import in.sevasamitit.sevasamiti_platform.entity.EmailOtp;
import in.sevasamitit.sevasamiti_platform.entity.Users;
import in.sevasamitit.sevasamiti_platform.repository.EmailOtpRepository;
import in.sevasamitit.sevasamiti_platform.repository.UserRepository;
import in.sevasamitit.sevasamiti_platform.util.OtpUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailOtpRepository otpRepo;
    private final UserRepository usersRepo;

    @Value("${app.email.from}")
    private String fromEmail;

    @Value("${app.otp.expiry.minutes:10}")
    private int otpExpiryMinutes;

    public EmailService(JavaMailSender mailSender,
                        EmailOtpRepository otpRepo,
                        UserRepository usersRepo) {
        this.mailSender = mailSender;
        this.otpRepo = otpRepo;
        this.usersRepo = usersRepo;
    }

    // public method to create OTP + send mail
    @Async

    public void generateAndSendOtpForUser(Long userId) {
        Users user = usersRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        // remove previous unused OTPs for user (optional)
        otpRepo.deleteByUserId(userId);

        // generate OTP
        String otp = OtpUtil.generateNumericOtp();
        String otpHash = OtpUtil.hashOtp(otp);
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(otpExpiryMinutes);

        EmailOtp record = new EmailOtp();
        record.setUserId(userId);
        record.setOtpHash(otpHash);
        record.setExpiresAt(expiresAt);
        otpRepo.save(record);

        // create email (plaintext; do NOT log OTP in server logs)
        String subject = "Your verification code";
        String body = "Hello " + user.getName() + ",\n\n"
                + "Your verification code is: " + otp + "\n\n"
                + "It will expire in " + otpExpiryMinutes + " minutes.\n\n"
                + "If you did not request this, ignore this message.\n\n"
                + "— Seva Samiti";

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(fromEmail);
        msg.setTo(user.getEmail());
        msg.setSubject(subject);
        msg.setText(body);

        mailSender.send(msg);
        // Note: otp variable should NOT be logged.
    }

    // verify OTP: returns true if ok
    public boolean verifyOtpForUser(Long userId, String incomingOtp) {
        EmailOtp otpRecord = otpRepo.findFirstByUserIdAndUsedFalseOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new IllegalArgumentException("No OTP found"));

        if (otpRecord.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("OTP expired");
        }

        boolean ok = OtpUtil.matches(incomingOtp, otpRecord.getOtpHash());
        if (!ok) return false;

        // mark used
        otpRecord.setUsed(true);
        otpRepo.save(otpRecord);

        // mark user verified
        Users user = usersRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setVerifiedEmail(true);
        usersRepo.save(user);

        return true;
    }
}
