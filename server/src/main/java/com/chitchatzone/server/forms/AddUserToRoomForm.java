package com.chitchatzone.server.forms;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class AddUserToRoomForm {

    @NotNull
    @Positive
    private int userId;

}
