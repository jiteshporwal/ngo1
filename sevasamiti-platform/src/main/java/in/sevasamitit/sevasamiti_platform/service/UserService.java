package in.sevasamitit.sevasamiti_platform.service;

import in.sevasamitit.sevasamiti_platform.dto.SignupRequest;
import in.sevasamitit.sevasamiti_platform.entity.Users;
import in.sevasamitit.sevasamiti_platform.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    // snippet in your UserService (change signature and return)
    public Users registerNewUser(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (userRepository.existsByPhone(req.getPhone())) {
            throw new IllegalArgumentException("Phone already in use");
        }

        Users u = new Users();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        u.setPhone(req.getPhone());
        String hash = passwordEncoder.encode(req.getPassword());
        u.setPasswordHash(hash);

        // save and return the saved entity
        return userRepository.save(u);
    }
}