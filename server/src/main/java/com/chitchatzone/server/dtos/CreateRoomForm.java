package com.chitchatzone.server.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateRoomForm {

    @NotBlank
    @Size(min = 1, max = 64)
    private String name;

    @NotNull
    private boolean isPrivate;

}
