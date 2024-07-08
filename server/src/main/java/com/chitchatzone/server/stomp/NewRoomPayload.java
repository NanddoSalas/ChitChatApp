package com.chitchatzone.server.stomp;

import com.chitchatzone.server.models.Room;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewRoomPayload extends JsonPayload {

    private Room room;

}
