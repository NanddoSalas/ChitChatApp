package com.chitchatzone.server.services;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatzone.server.dtos.SignInDTO;
import com.chitchatzone.server.dtos.SignInForm;
import com.chitchatzone.server.dtos.SignUpForm;
import com.chitchatzone.server.exceptions.EmailAlreadyInUseException;
import com.chitchatzone.server.exceptions.InvalidInvitationCodeException;
import com.chitchatzone.server.models.MyUserPrincipal;
import com.chitchatzone.server.models.User;
import com.chitchatzone.server.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public SignInDTO signIn(SignInForm signInForm) {
        Authentication authReq = UsernamePasswordAuthenticationToken
                .unauthenticated(signInForm.getEmail(), signInForm.getPassword());
        Authentication authRes = this.authenticationManager.authenticate(authReq);

        MyUserPrincipal principal = (MyUserPrincipal) authRes.getPrincipal();
        User user = principal.getUser();
        Jwt jwt = jwtService.generateAccessToken(user);
        String token = jwt.getTokenValue();
        SignInDTO signInDTO = new SignInDTO();

        signInDTO.setAccessToken(token);
        signInDTO.setUser(user.toDTO());

        return signInDTO;
    }

    public void signUp(SignUpForm signUpForm)
            throws EmailAlreadyInUseException, InvalidInvitationCodeException {
        try {
            userRepository.addUser(signUpForm.getFullName(), signUpForm.getEmail(),
                    encoder.encode(signUpForm.getPassword()), signUpForm.getInviteCode());
        } catch (DataAccessException e) {
            if (e.getClass() == DuplicateKeyException.class) {
                throw new EmailAlreadyInUseException("Email already in use");
            } else {
                throw new InvalidInvitationCodeException("Invalid invitation code");
            }
        }

    }

}
