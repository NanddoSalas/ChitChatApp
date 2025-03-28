package com.chitchatapp.server.services;

import java.text.ParseException;
import java.util.Optional;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatapp.server.GoogleAuthClient;
import com.chitchatapp.server.dtos.SignInDTO;
import com.chitchatapp.server.dtos.SignInForm;
import com.chitchatapp.server.dtos.SignUpForm;
import com.chitchatapp.server.exceptions.EmailAlreadyInUseException;
import com.chitchatapp.server.exceptions.GenericMessageException;
import com.chitchatapp.server.exceptions.InvalidInvitationCodeException;
import com.chitchatapp.server.forms.GoogleSignInForm;
import com.chitchatapp.server.forms.GoogleSignUpForm;
import com.chitchatapp.server.models.InvitedUser;
import com.chitchatapp.server.models.MyUserPrincipal;
import com.chitchatapp.server.models.User;
import com.chitchatapp.server.repositories.UserRepository;
import com.chitchatapp.server.stomp.NewUserPayload;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final GoogleAuthClient googleAuthClient;
    private final SimpMessagingTemplate template;

    public SignInDTO signIn(SignInForm form) {
        Authentication authReq = UsernamePasswordAuthenticationToken
                .unauthenticated(form.getEmail(), form.getPassword());
        Authentication authRes = this.authenticationManager.authenticate(authReq);

        MyUserPrincipal principal = (MyUserPrincipal) authRes.getPrincipal();
        User user = principal.getUser();
        Jwt jwt = jwtService.generateAccessToken(user);
        String token = jwt.getTokenValue();
        SignInDTO signInDTO = new SignInDTO();

        signInDTO.setAccessToken(token);
        signInDTO.setUser(user.toFullDTO());

        return signInDTO;
    }

    public void signUp(SignUpForm form)
            throws EmailAlreadyInUseException, InvalidInvitationCodeException {
        try {
            InvitedUser invitedUser = userRepository.addUser(form.getFullName(), form.getEmail(),
                    encoder.encode(form.getPassword()), form.getInviteCode());

            Optional<User> user = userRepository.findById(invitedUser.getUserId());


            if (user.isPresent()) {
                String payload = new NewUserPayload(user.get()).build();
                template.convertAndSend("/topic/new-user", payload);
            }


        } catch (DataAccessException e) {
            if (e.getClass() == DuplicateKeyException.class) {
                throw new EmailAlreadyInUseException("Email already in use");
            } else {
                throw new InvalidInvitationCodeException("Invalid invitation code");
            }
        }

    }

    public SignInDTO googleSignIn(GoogleSignInForm form) throws GenericMessageException {
        Optional<JWT> jwt = googleAuthClient.requestIdToken(form.getCode());
        String googleId;
        JWTClaimsSet claims;

        if (jwt.isEmpty()) {
            throw new GenericMessageException("User does not exist, Sign Up first!");
        }

        try {
            claims = jwt.get().getJWTClaimsSet();
            googleId = claims.getSubject();
        } catch (ParseException e) {
            throw new GenericMessageException("User does not exist, Sign Up first!");
        }

        Optional<User> user = userRepository.findByGoogleId(googleId);

        if (user.isEmpty()) {
            throw new GenericMessageException("User does not exist, Sign Up first!");
        }

        String accessToken = jwtService.generateAccessToken(user.get()).getTokenValue();
        SignInDTO signInDTO = new SignInDTO();

        signInDTO.setAccessToken(accessToken);
        signInDTO.setUser(user.get().toFullDTO());

        return signInDTO;
    }


    public void googleSignUp(GoogleSignUpForm form) throws InvalidInvitationCodeException,
            EmailAlreadyInUseException, GenericMessageException {
        Optional<JWT> jwt = googleAuthClient.requestIdToken(form.getCode());
        JWTClaimsSet claims;

        try {
            claims = jwt.orElseThrow().getJWTClaimsSet();
        } catch (ParseException e) {
            return;
        }

        try {
            InvitedUser invitedUser = userRepository.addGoogleUser(
                    claims.getClaim("name").toString(), claims.getClaim("email").toString(),
                    claims.getSubject(), form.getInviteCode());

            Optional<User> user = userRepository.findById(invitedUser.getUserId());

            if (user.isPresent()) {
                String payload = new NewUserPayload(user.get()).build();
                template.convertAndSend("/topic/new-user", payload);
            }
        } catch (DataAccessException e) {
            if (e.getClass() == DuplicateKeyException.class) {

                throw new GenericMessageException(
                        "Unable to Sign Up, try with a different Google Account");
            } else {
                throw new InvalidInvitationCodeException("Invalid invitation code");
            }
        }

    }

}
