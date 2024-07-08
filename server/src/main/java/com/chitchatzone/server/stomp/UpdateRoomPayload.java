package com.chitchatzone.server.stomp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateRoomPayload extends JsonPayload {

    private int roomId;
    private String roomName;
    private Boolean isPrivate;

}
