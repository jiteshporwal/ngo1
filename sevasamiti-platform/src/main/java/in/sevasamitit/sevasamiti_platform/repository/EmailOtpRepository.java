package in.sevasamitit.sevasamiti_platform.repository;

import in.sevasamitit.sevasamiti_platform.entity.EmailOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmailOtpRepository extends JpaRepository<EmailOtp, Long> {
    Optional<EmailOtp> findFirstByUserIdAndUsedFalseOrderByCreatedAtDesc(Long userId);
    void deleteByUserId(Long userId);
}