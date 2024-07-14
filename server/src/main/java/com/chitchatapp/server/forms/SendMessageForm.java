package com.chitchatapp.server.forms;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SendMessageForm {

    @NotBlank
    @Size(min = 1, max = 256)
    private String body;

}
