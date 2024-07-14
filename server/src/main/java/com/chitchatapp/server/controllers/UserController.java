package com.chitchatapp.server.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chitchatapp.server.dtos.ResponseDTO;
import com.chitchatapp.server.dtos.UserDTO;
import com.chitchatapp.server.exceptions.GenericMessageException;
import com.chitchatapp.server.forms.GoogleSignInForm;
import com.chitchatapp.server.forms.UpdatePasswordForm;
import com.chitchatapp.server.forms.UpdateProfileForm;
import com.chitchatapp.server.forms.UpdateRoleForm;
import com.chitchatapp.server.services.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> retrieveUsers() {
        List<UserDTO> userDTOs = userService.retrieveUsers();

        return ResponseDTO.ok(userDTOs);
    }

    @PutMapping("{userId}/profile")
    public ResponseEntity<ResponseDTO> updateProfile(@PathVariable String userId,
            @Valid @RequestBody UpdateProfileForm form) throws NumberFormatException, Exception {
        userService.updateProfile(Integer.parseInt(userId), form);

        return ResponseDTO.ok(null);
    }

    @PutMapping("{userId}/password")
    public ResponseEntity<ResponseDTO> updatePassword(@PathVariable String userId,
            @Valid @RequestBody UpdatePasswordForm form) throws Exception {
        userService.updatePassword(Integer.parseInt(userId), form);

        return ResponseDTO.ok(null);
    }

    @PutMapping("{userId}/role")
    public ResponseEntity<ResponseDTO> updateRole(@PathVariable String userId,
            @Valid @RequestBody UpdateRoleForm form) {
        userService.updateRole(Integer.parseInt(userId), form);

        return ResponseDTO.ok(null);
    }

    @PutMapping("{userId}/google")
    public ResponseEntity<ResponseDTO> connectGoogleAccount(@PathVariable String userId,
            @Valid @RequestBody GoogleSignInForm form) throws NumberFormatException, Exception {
        userService.connectGoogleAccount(Integer.parseInt(userId), form);
        return ResponseDTO.ok(null);
    }

    @DeleteMapping("{userId}/google")
    public ResponseEntity<ResponseDTO> disconnectGoogleAccount(@PathVariable String userId)
            throws GenericMessageException, Exception {
        userService.disconnectGoogleAccount(Integer.parseInt(userId));
        return ResponseDTO.ok(null);
    }

}
