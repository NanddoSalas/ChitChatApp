package com.chitchatzone.server.stomp;

import com.chitchatzone.server.models.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewUserPayload extends JsonPayload {

    private User user;

}
