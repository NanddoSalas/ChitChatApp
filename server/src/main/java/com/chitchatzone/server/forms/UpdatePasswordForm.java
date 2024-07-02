package com.chitchatzone.server.forms;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdatePasswordForm {

    // @NotBlank
    @Size(min = 8, max = 32)
    private String oldPassword;

    @NotBlank
    @Size(min = 8, max = 32)
    private String newPassword;

}
