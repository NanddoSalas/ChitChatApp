package com.chitchatapp.server.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignInForm {

    @NotBlank
    @Email
    @Size(min = 1, max = 64)
    private String email;

    @NotBlank
    @Size(min = 8, max = 32)
    private String password;

}
