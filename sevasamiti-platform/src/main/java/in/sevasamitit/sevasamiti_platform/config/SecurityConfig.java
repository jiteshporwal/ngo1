package in.sevasamitit.sevasamiti_platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    // Allow signup endpoint + actuator (if needed) without authentication.
    // For testing with Postman we disable CSRF (safe for dev only).
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // disable for API testing (enable later for browser forms)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/signup", "/api/auth/**").permitAll()
                        .anyRequest().authenticated()
                )
                // do not enable form login or HTTP basic by default (optional)
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
