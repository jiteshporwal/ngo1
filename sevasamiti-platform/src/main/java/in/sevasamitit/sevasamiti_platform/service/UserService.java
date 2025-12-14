package in.sevasamitit.sevasamiti_platform.service;

import in.sevasamitit.sevasamiti_platform.dto.SignupRequest;
import in.sevasamitit.sevasamiti_platform.entity.AuthProvider;
import in.sevasamitit.sevasamiti_platform.entity.Users;
import in.sevasamitit.sevasamiti_platform.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Users registerNewUser(SignupRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new IllegalArgumentException("Username is already taken");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email address already in use");
        }
        if (userRepository.existsByPhone(req.getPhone())) {
            throw new IllegalArgumentException("Phone number already in use");
        }

        Users u = new Users();
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());
        u.setPhone(req.getPhone()); // Set phone number
        u.setCity(req.getCity());   // Set city
        u.setState(req.getState()); // Set state
        u.setAuthProvider(AuthProvider.local);
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setVerifiedEmail(Boolean.FALSE); // Set to FALSE by default, to be verified by OTP

        return userRepository.save(u);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        Users user = userRepository.findById(id).orElseThrow(
            () -> new UsernameNotFoundException("User not found with id : " + id)
        );
        return UserPrincipal.create(user);
    }
}