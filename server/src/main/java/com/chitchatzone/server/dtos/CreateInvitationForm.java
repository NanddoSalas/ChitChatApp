package com.chitchatzone.server.dtos;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class CreateInvitationForm {

    @PositiveOrZero
    private int limit;

}
