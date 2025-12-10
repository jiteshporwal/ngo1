package in.sevasamitit.sevasamiti_platform.controller;

import in.sevasamitit.sevasamiti_platform.entity.Donation;
import in.sevasamitit.sevasamiti_platform.service.DonationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin
public class DonationController {


    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping("/create")
    public Donation createDonation(@RequestBody Donation donation) {
        return donationService.createDonation(donation);
    }

    // For admin
    @PostMapping("/link")
    public Donation linkDonation(
            @RequestParam Long donationId,
            @RequestParam Long userId) {
        return donationService.linkDonationToUser(donationId, userId);
    }
}
