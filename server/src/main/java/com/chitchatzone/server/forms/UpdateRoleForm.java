package com.chitchatzone.server.forms;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateRoleForm {

    // todo: add custom role validator
    @NotBlank
    private String role;

}
