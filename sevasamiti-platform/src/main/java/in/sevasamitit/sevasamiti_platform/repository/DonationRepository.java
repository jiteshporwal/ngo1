package in.sevasamitit.sevasamiti_platform.repository;

import in.sevasamitit.sevasamiti_platform.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByDonorEmail(String email);

    List<Donation> findByUserId(Long userId);

    List<Donation> findByDonorEmailAndUserIdIsNull(String email);
}
