package com.chitchatapp.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chitchatapp.server.dtos.ResponseDTO;
import com.chitchatapp.server.dtos.SignInForm;
import com.chitchatapp.server.dtos.SignUpForm;
import com.chitchatapp.server.exceptions.EmailAlreadyInUseException;
import com.chitchatapp.server.exceptions.GenericMessageException;
import com.chitchatapp.server.exceptions.InvalidInvitationCodeException;
import com.chitchatapp.server.forms.GoogleSignInForm;
import com.chitchatapp.server.forms.GoogleSignUpForm;
import com.chitchatapp.server.services.AuthService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signUp(@Valid @RequestBody SignUpForm form)
            throws EmailAlreadyInUseException, InvalidInvitationCodeException {
        authService.signUp(form);

        return ResponseDTO.ok(null);
    }

    @PostMapping("/signin")
    public ResponseEntity<ResponseDTO> signIn(@Valid @RequestBody SignInForm form) {
        return ResponseDTO.ok(authService.signIn(form));
    }

    @PostMapping("/signup/google")
    public ResponseEntity<ResponseDTO> googleSignUp(@Valid @RequestBody GoogleSignUpForm form)
            throws InvalidInvitationCodeException, EmailAlreadyInUseException,
            GenericMessageException {
        authService.googleSignUp(form);

        return ResponseDTO.ok(null);
    }

    @PostMapping("/signin/google")
    public ResponseEntity<ResponseDTO> googleSignIn(@Valid @RequestBody GoogleSignInForm form)
            throws GenericMessageException {
        return ResponseDTO.ok(authService.googleSignIn(form));
    }

}
