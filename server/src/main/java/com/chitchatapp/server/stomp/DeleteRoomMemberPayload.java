package com.chitchatapp.server.stomp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeleteRoomMemberPayload extends JsonPayload {

    private int roomId;

}
