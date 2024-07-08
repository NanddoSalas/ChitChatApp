package com.chitchatzone.server.stomp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateUserPayload extends JsonPayload {

    private int userId;
    private String fullName;
    private String about;

}
