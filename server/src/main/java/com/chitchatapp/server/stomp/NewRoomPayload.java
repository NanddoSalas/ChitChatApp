package com.chitchatapp.server.stomp;

import com.chitchatapp.server.models.Room;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewRoomPayload extends JsonPayload {

    private Room room;

}
