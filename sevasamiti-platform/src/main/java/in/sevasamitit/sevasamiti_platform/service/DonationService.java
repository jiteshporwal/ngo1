package in.sevasamitit.sevasamiti_platform.service;

import in.sevasamitit.sevasamiti_platform.entity.Donation;
import in.sevasamitit.sevasamiti_platform.entity.Users;
import in.sevasamitit.sevasamiti_platform.repository.DonationRepository;
import in.sevasamitit.sevasamiti_platform.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class DonationService {

    private final DonationRepository donationRepo;
    private final UserRepository userRepo;

    public DonationService(DonationRepository donationRepo, UserRepository userRepo) {
        this.donationRepo = donationRepo;
        this.userRepo = userRepo;
    }

    // Create donation (guest or logged-in)
    public Donation createDonation(Donation donation) {

        // 1. If user is logged-in → attach directly
        if (donation.getUserId() != null) {
            return donationRepo.save(donation);
        }

        // 2. If guest donor email matches an existing user → auto-attach
        Users existingUser = userRepo.findByEmail(donation.getDonorEmail()).orElse(null);

        if (existingUser != null) {
            donation.setUserId(existingUser.getUserId());
        }

        Donation saved = donationRepo.save(donation);

        // 3. Auto-membership logic (sum >= 2000)
        if (existingUser != null) {

            double total = donationRepo.findByUserId(existingUser.getUserId())
                    .stream()
                    .mapToDouble(Donation::getAmount)
                    .sum();

            // If user eligible for community membership
            if (total >= 2000 && !"community".equals(existingUser.getRole())) {
                existingUser.setRole("community");  // promote user
                userRepo.save(existingUser);
            }
        }


        return saved;
    }

    // Admin manually links a donation
    public Donation linkDonationToUser(Long donationId, Long userId) {
        Donation donation = donationRepo.findById(donationId)
                .orElseThrow(() -> new IllegalArgumentException("Donation not found"));

        donation.setUserId(userId);
        donation.setClaimed(true);
        return donationRepo.save(donation);
    }
}
