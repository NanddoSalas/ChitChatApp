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
import com.chitchatzone.server.dtos.UpdatePasswordForm;
import com.chitchatzone.server.dtos.UpdateProfileForm;
import com.chitchatzone.server.dtos.UpdateRoleForm;
import com.chitchatzone.server.dtos.UserDTO;
import com.chitchatzone.server.exceptions.InvalidOldPasswordException;
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

    @PutMapping("{id}/profile")
    public ResponseEntity<ResponseDTO> updateProfile(@PathVariable String id,
            @Valid @RequestBody UpdateProfileForm updateProfileForm) {
        userService.updateProfile(Integer.parseInt(id), updateProfileForm);
        return ResponseDTO.ok(null);
    }

    @PutMapping("{id}/password")
    public ResponseEntity<ResponseDTO> updatePassword(@PathVariable String id,
            @Valid @RequestBody UpdatePasswordForm updatePasswordForm)
            throws NumberFormatException, InvalidOldPasswordException {
        userService.updatePassword(Integer.parseInt(id), updatePasswordForm);
        return ResponseDTO.ok(null);
    }

    @PutMapping("{id}/role")
    public ResponseEntity<ResponseDTO> updateRole(@PathVariable String id,
            @Valid @RequestBody UpdateRoleForm updateRoleForm) {
        userService.updateRole(Integer.parseInt(id), updateRoleForm);
        return ResponseDTO.ok(null);
    }

}
