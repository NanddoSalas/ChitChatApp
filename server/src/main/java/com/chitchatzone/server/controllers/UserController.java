package com.chitchatzone.server.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chitchatzone.server.dtos.ResponseDTO;
import com.chitchatzone.server.dtos.UserDTO;
import com.chitchatzone.server.forms.UpdatePasswordForm;
import com.chitchatzone.server.forms.UpdateProfileForm;
import com.chitchatzone.server.forms.UpdateRoleForm;
import com.chitchatzone.server.services.UserService;

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
    public ResponseEntity<ResponseDTO> updateProfile(
            @PathVariable String userId,
            @Valid @RequestBody UpdateProfileForm form) throws NumberFormatException, Exception {
        userService.updateProfile(Integer.parseInt(userId), form);

        return ResponseDTO.ok(null);
    }

    @PutMapping("{userId}/password")
    public ResponseEntity<ResponseDTO> updatePassword(
            @PathVariable String userId,
            @Valid @RequestBody UpdatePasswordForm form)
            throws Exception {
        userService.updatePassword(Integer.parseInt(userId), form);

        return ResponseDTO.ok(null);
    }

    @PutMapping("{userId}/role")
    public ResponseEntity<ResponseDTO> updateRole(
            @PathVariable String userId,
            @Valid @RequestBody UpdateRoleForm form) {
        userService.updateRole(Integer.parseInt(userId), form);

        return ResponseDTO.ok(null);
    }

}
