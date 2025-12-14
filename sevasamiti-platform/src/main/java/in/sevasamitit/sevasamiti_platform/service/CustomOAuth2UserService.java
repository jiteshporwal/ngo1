package in.sevasamitit.sevasamiti_platform.service;

import in.sevasamitit.sevasamiti_platform.entity.AuthProvider;
import in.sevasamitit.sevasamiti_platform.entity.Users;
import in.sevasamitit.sevasamiti_platform.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        String email = oAuth2User.getAttribute("email");
        Optional<Users> userOptional = userRepository.findByEmail(email);
        Users user;
        if(userOptional.isPresent()) {
            user = userOptional.get();
            if(!user.getAuthProvider().equals(AuthProvider.google)) {
                throw new OAuth2AuthenticationException("Looks like you're signed up with " +
                        user.getAuthProvider() + " account. Please use your " + user.getAuthProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2User);
        } else {
            user = registerNewUser(oAuth2User);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private Users registerNewUser(OAuth2User oAuth2User) {
        Users user = new Users();

        user.setAuthProvider(AuthProvider.google);
        user.setUsername(oAuth2User.getAttribute("name"));
        user.setEmail(oAuth2User.getAttribute("email"));
        user.setProfilePicture(oAuth2User.getAttribute("picture"));
        return userRepository.save(user);
    }

    private Users updateExistingUser(Users existingUser, OAuth2User oAuth2User) {
        existingUser.setUsername(oAuth2User.getAttribute("name"));
        existingUser.setProfilePicture(oAuth2User.getAttribute("picture"));
        return userRepository.save(existingUser);
    }
}
