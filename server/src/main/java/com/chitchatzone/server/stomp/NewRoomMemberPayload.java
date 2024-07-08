package com.chitchatzone.server.stomp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewRoomMemberPayload extends JsonPayload {

    private int roomId;

}
