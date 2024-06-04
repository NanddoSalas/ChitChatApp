package com.chitchatzone.server.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chitchatzone.server.dtos.ResponseDTO;
import com.chitchatzone.server.dtos.UserDTO;
import com.chitchatzone.server.services.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<ResponseDTO> retrieveUsers() {
        List<UserDTO> userDTOs = userService.retrieveUsers();

        return ResponseDTO.ok(userDTOs);
    }

}
