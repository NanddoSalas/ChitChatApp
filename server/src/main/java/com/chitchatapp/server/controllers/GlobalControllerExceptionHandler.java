package com.chitchatapp.server.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.chitchatapp.server.dtos.ResponseDTO;
import com.chitchatapp.server.exceptions.EmailAlreadyInUseException;
import com.chitchatapp.server.exceptions.GenericMessageException;
import com.chitchatapp.server.exceptions.InvalidInvitationCodeException;
import com.chitchatapp.server.exceptions.InvalidOldPasswordException;

@RestControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDTO> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseDTO.badRequest(errors);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseDTO> handleBadCredentialsException(BadCredentialsException ex) {
        Map<String, String> errors = new HashMap<>();

        errors.put("message", "Invalid credentials");

        return ResponseDTO.badRequest(errors);
    }

    @ExceptionHandler(EmailAlreadyInUseException.class)
    public ResponseEntity<ResponseDTO> handleEmailAlreadyInUseException(
            EmailAlreadyInUseException ex) {
        Map<String, String> errors = new HashMap<>();

        errors.put("email", "Email already in use");

        return ResponseDTO.badRequest(errors);
    }

    @ExceptionHandler(InvalidInvitationCodeException.class)
    public ResponseEntity<ResponseDTO> handleInvalidInvitationCodeException() {
        Map<String, String> errors = new HashMap<>();

        errors.put("inviteCode", "Invalid invitation code");

        return ResponseDTO.badRequest(errors);
    }

    @ExceptionHandler(InvalidOldPasswordException.class)
    public ResponseEntity<ResponseDTO> handleInvalidOldPasswordException() {
        Map<String, String> errors = new HashMap<>();

        errors.put("oldPassword", "Invalid old password");

        return ResponseDTO.badRequest(errors);
    }

    @ExceptionHandler(GenericMessageException.class)
    public ResponseEntity<ResponseDTO> handleGenericMessageException(GenericMessageException ex) {
        Map<String, String> errors = new HashMap<>();

        errors.put("message", ex.getMessage());

        return ResponseDTO.badRequest(errors);
    }

}
