package com.chitchatzone.server.services;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatzone.server.dtos.CreateRoomForm;
import com.chitchatzone.server.dtos.UpdateRoomForm;
import com.chitchatzone.server.models.Room;
import com.chitchatzone.server.repositories.RoomRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<Room> retrieveRooms() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        return roomRepository.findAll(sub);
    }

    // todo: change room for room dto

    public Room createRoom(CreateRoomForm createRoomForm) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        return roomRepository.createRoom(sub, createRoomForm.getName(), createRoomForm.isPrivate());

    }

    public void updateRoom(int roomId, UpdateRoomForm updateRoomForm) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        roomRepository.updateRoom(roomId, sub, updateRoomForm.getName(),
                updateRoomForm.isPrivate());
    }

    public void deleteRoom(int roomId) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        roomRepository.deleteRoom(roomId, sub);
    }

}
