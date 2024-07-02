package com.chitchatzone.server.services;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatzone.server.GoogleAuthClient;
import com.chitchatzone.server.dtos.UserDTO;
import com.chitchatzone.server.exceptions.GenericMessageException;
import com.chitchatzone.server.exceptions.InvalidOldPasswordException;
import com.chitchatzone.server.forms.GoogleSignInForm;
import com.chitchatzone.server.forms.UpdatePasswordForm;
import com.chitchatzone.server.forms.UpdateProfileForm;
import com.chitchatzone.server.forms.UpdateRoleForm;
import com.chitchatzone.server.models.User;
import com.chitchatzone.server.repositories.UserRepository;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final GoogleAuthClient googleAuthClient;

    public List<UserDTO> retrieveUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map((user) -> user.toDTO()).toList();
    }

    public void updateProfile(int userId, UpdateProfileForm form) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        if (userId == sub) {
            userRepository.updateProfile(userId, form.getFullName(), form.getAbout());
        } else {
            throw new Exception("update someone else's profile not allowed");
        }
    }

    public void updatePassword(int userId, UpdatePasswordForm form) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        if (userId == sub) {
            Optional<User> user = userRepository.findById(userId);

            String newPassword = form.getNewPassword();
            String newEncryptedPassword = encoder.encode(newPassword);

            if (user.get().getPassword() == null) {
                userRepository.updatePassword(userId, newEncryptedPassword);
                return;
            }

            String oldPassword = form.getOldPassword();
            String oldEncryptedPassword = user.get().getPassword();

            if (encoder.matches(oldPassword, oldEncryptedPassword)) {
                userRepository.updatePassword(userId, newEncryptedPassword);
            } else {
                throw new InvalidOldPasswordException("Invalid old password");
            }

        } else {
            throw new Exception("update someone else's password not allowed");
        }
    }

    public void updateRole(int userId, UpdateRoleForm form) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        if (userId == sub) {
            return;
        }

        userRepository.updateRole(userId, form.getRole());
    }

    public void connectGoogleAccount(int userId, GoogleSignInForm form) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        if (userId != sub) {
            throw new Exception("update someone else's user not allowed");
        }

        Optional<JWT> idToken = googleAuthClient.requestIdToken(form.getCode());
        JWTClaimsSet claims;

        try {
            claims = idToken.orElseThrow().getJWTClaimsSet();
        } catch (ParseException e) {
            throw new GenericMessageException(
                    "Unable to connect that Google Account, try a different one!");
        }

        try {
            userRepository.connectGoogleAccount(sub, claims.getSubject());
        } catch (Exception e) {
            throw new GenericMessageException(
                    "Unable to connect that Google Account, try a different one!");
        }

    }

    public void disconnectGoogleAccount(int userId) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        if (userId != sub) {
            throw new Exception("update someone else's user not allowed");
        }

        Boolean isSuccess = userRepository.disconnectGoogleAccount(sub);

        if (!isSuccess) {
            throw new GenericMessageException("Must have at least 1 authentication method!");
        }
    }

}
