package com.chitchatzone.server.dtos;

import com.chitchatzone.server.models.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpForm {

    @NotBlank
    @Size(min = 1, max = 64)
    private String fullName;

    @NotBlank
    @Email
    @Size(min = 1, max = 64)
    private String email;

    @NotBlank
    @Size(min = 8, max = 32)
    private String password;

    @NotBlank
    private String inviteCode;

    public User toUser() {
        User user = new User();

        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(password);

        return user;
    }

}
