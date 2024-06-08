package com.chitchatzone.server.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileForm {

    @NotBlank
    @Size(min = 1, max = 64)
    private String fullName;

    @NotNull
    @Size(min = 0, max = 256)
    private String about;

}
