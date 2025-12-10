package in.sevasamitit.sevasamiti_platform.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // userId is optional (nullable = true)
    @Column(nullable = true)
    private Long userId;

    @Column(nullable = false)
    private String donorName;

    @Column(nullable = false)
    private String donorEmail;

    @Column(nullable = true)
    private String donorPhone;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String paymentStatus;   // SUCCESS / FAILED / PENDING

    @Column(nullable = true)
    private String transactionId;   // Razorpay/UPI transaction ID

    private LocalDateTime createdAt = LocalDateTime.now();

    // Whether donation has been claimed later by user
    private boolean claimed = false;
}
