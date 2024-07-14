package com.chitchatapp.server.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chitchatapp.server.dtos.ResponseDTO;
import com.chitchatapp.server.forms.CreateRoomForm;
import com.chitchatapp.server.forms.UpdateRoomForm;
import com.chitchatapp.server.models.Room;
import com.chitchatapp.server.services.RoomService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/rooms")
@AllArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> retrieveRooms() {
        List<Room> rooms = roomService.retrieveRooms();

        return ResponseDTO.ok(rooms);
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> createRoom(@Valid @RequestBody CreateRoomForm form) {
        Room room = roomService.createRoom(form);

        return ResponseDTO.ok(room);
    }

    @PutMapping("{roomId}")
    public ResponseEntity<ResponseDTO> updateRoom(
            @PathVariable String roomId,
            @Valid @RequestBody UpdateRoomForm form) {
        roomService.updateRoom(Integer.parseInt(roomId), form);

        return ResponseDTO.ok(null);
    }

    @DeleteMapping("{roomId}")
    public ResponseEntity<ResponseDTO> deleteRoom(@PathVariable String roomId) {
        roomService.deleteRoom(Integer.parseInt(roomId));

        return ResponseDTO.ok(null);
    }

}
