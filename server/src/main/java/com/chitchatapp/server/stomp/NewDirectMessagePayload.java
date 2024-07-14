package com.chitchatapp.server.stomp;

import com.chitchatapp.server.models.Message;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewDirectMessagePayload extends JsonPayload {

    private Message message;

}
