package com.chitchatapp.server.forms;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class CreateInvitationForm {

    @PositiveOrZero
    private int limit;

}
