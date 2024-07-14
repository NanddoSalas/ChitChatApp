package com.chitchatapp.server.stomp;

import com.chitchatapp.server.models.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewUserPayload extends JsonPayload {

    private User user;

}
