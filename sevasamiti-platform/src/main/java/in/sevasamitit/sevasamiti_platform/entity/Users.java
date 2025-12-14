package in.sevasamitit.sevasamiti_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, unique = true, length = 150)
    private String username;

    @Column(unique = true, length = 200)
    private String email;

    @Column(unique = true, length = 20)
    private String phone;

    @Column(name = "password", length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider", nullable = false, length = 10)
    private AuthProvider authProvider;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(name = "profile_picture", length = 512)
    private String profilePicture;

    @Column(length = 50)
    private String role = "guest";   // guest, user, community, admin

    @Column(name = "blue_tick")
    private Boolean blueTick = Boolean.FALSE;

    @Column(name = "verified_email")
    private Boolean verifiedEmail = Boolean.FALSE;

    @Column(name = "verified_phone")
    private Boolean verifiedPhone = Boolean.FALSE;

    // NEW FIELD FOR MEMBERSHIP LOGIC
    @Column(name = "is_community_member")
    private boolean communityMember = false;

    // DB managed timestamps
    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}
