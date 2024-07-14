package com.chitchatapp.server.stomp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeleteRoomPayload extends JsonPayload {

    private int roomId;

}
