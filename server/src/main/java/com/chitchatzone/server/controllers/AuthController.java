package com.chitchatzone.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chitchatzone.server.dtos.ResponseDTO;
import com.chitchatzone.server.dtos.SignInForm;
import com.chitchatzone.server.dtos.SignUpForm;
import com.chitchatzone.server.exceptions.EmailAlreadyInUseException;
import com.chitchatzone.server.exceptions.InvalidInvitationCodeException;
import com.chitchatzone.server.services.AuthService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signUp(@Valid @RequestBody SignUpForm signUpForm)
            throws EmailAlreadyInUseException, InvalidInvitationCodeException {
        authService.signUp(signUpForm);
        return ResponseDTO.ok(null);
    }

    @PostMapping("/signin")
    public ResponseEntity<ResponseDTO> signIn(@Valid @RequestBody SignInForm signInForm) {
        return ResponseDTO.ok(authService.signIn(signInForm));
    }

}
