package com.chitchatapp.server.forms;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoogleSignInForm {

    @NotBlank
    private String code;

}
