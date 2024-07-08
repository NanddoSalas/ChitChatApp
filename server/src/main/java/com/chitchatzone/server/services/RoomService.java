package com.chitchatzone.server.services;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatzone.server.forms.CreateRoomForm;
import com.chitchatzone.server.forms.UpdateRoomForm;
import com.chitchatzone.server.models.Room;
import com.chitchatzone.server.repositories.RoomRepository;
import com.chitchatzone.server.stomp.DeleteRoomPayload;
import com.chitchatzone.server.stomp.NewRoomPayload;
import com.chitchatzone.server.stomp.UpdateRoomPayload;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final SimpMessagingTemplate template;

    public List<Room> retrieveRooms() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        return roomRepository.findAll(sub);
    }

    public Room createRoom(CreateRoomForm form) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        Room room = roomRepository.createRoom(sub, form.getName(), form.isPrivate());

        room.setHasAccess(false);
        String payload = new NewRoomPayload(room).build();
        room.setHasAccess(true);

        template.convertAndSend("/topic/new-room", payload);

        return room;

    }

    public void updateRoom(int roomId, UpdateRoomForm form) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        Boolean isSuccess =
                roomRepository.updateRoom(roomId, sub, form.getName(), form.isPrivate());

        if (isSuccess) {
            String payload =
                    new UpdateRoomPayload(roomId, form.getName(), form.isPrivate()).build();

            template.convertAndSend("/topic/update-room", payload);
        }
    }

    public void deleteRoom(int roomId) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        Boolean isSuccess = roomRepository.deleteRoom(roomId, sub);

        if (isSuccess) {
            String payload = new DeleteRoomPayload(roomId).build();

            template.convertAndSend("/topic/delete-room", payload);
        }
    }

}
