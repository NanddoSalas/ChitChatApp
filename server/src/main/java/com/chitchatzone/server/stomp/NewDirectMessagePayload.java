package com.chitchatzone.server.stomp;

import com.chitchatzone.server.models.Message;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewDirectMessagePayload extends JsonPayload {

    private Message message;

}
