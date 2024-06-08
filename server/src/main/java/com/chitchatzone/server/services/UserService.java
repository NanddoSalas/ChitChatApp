package com.chitchatzone.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatzone.server.dtos.UpdatePasswordForm;
import com.chitchatzone.server.dtos.UpdateProfileForm;
import com.chitchatzone.server.dtos.UpdateRoleForm;
import com.chitchatzone.server.dtos.UserDTO;
import com.chitchatzone.server.exceptions.InvalidOldPasswordException;
import com.chitchatzone.server.models.User;
import com.chitchatzone.server.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public List<UserDTO> retrieveUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map((user) -> user.toDTO()).toList();
    }

    public void updateProfile(int userId, UpdateProfileForm updateProfileForm) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        if (userId == sub) {
            userRepository.updateProfile(userId, updateProfileForm.getFullName(),
                    updateProfileForm.getAbout());

        } else {
            // todo: handle when user tries to update someone else's profile
        }

    }

    public void updatePassword(int userId, UpdatePasswordForm updatePasswordForm)
            throws InvalidOldPasswordException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        if (userId == sub) {
            Optional<User> user = userRepository.findById(userId);

            if (user.isPresent()) {
                String oldPassword = updatePasswordForm.getOldPassword();
                String newPassword = updatePasswordForm.getNewPassword();
                String oldEncryptedPassword = user.get().getPassword();
                String newEncryptedPassword = encoder.encode(newPassword);

                if (encoder.matches(oldPassword, oldEncryptedPassword)) {
                    userRepository.updatePassword(userId, newEncryptedPassword);
                } else {
                    throw new InvalidOldPasswordException("Invalid old password");
                }
            } else {
                // no way
            }
        } else {
            // todo: handle when user tries to update someone else's password
        }
    }

    public void updateRole(int userId, UpdateRoleForm updateRoleForm) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        if (userId == sub) {
            return;
        }

        userRepository.updateRole(userId, updateRoleForm.getRole());
    }

}
