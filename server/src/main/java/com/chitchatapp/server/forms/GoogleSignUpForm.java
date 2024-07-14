package com.chitchatapp.server.forms;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoogleSignUpForm {

    @NotBlank
    private String code;

    @NotBlank
    private String inviteCode;

}
