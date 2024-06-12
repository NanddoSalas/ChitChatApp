package com.chitchatzone.server.controllers;

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

import com.chitchatzone.server.dtos.CreateRoomForm;
import com.chitchatzone.server.dtos.ResponseDTO;
import com.chitchatzone.server.dtos.UpdateRoomForm;
import com.chitchatzone.server.models.Room;
import com.chitchatzone.server.services.RoomService;

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

    @PutMapping("{id}")
    public ResponseEntity<ResponseDTO> updateRoom(
            @PathVariable String id,
            @Valid @RequestBody UpdateRoomForm form) {
        roomService.updateRoom(Integer.parseInt(id), form);

        return ResponseDTO.ok(null);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ResponseDTO> deleteRoom(@PathVariable String id) {
        roomService.deleteRoom(Integer.parseInt(id));

        return ResponseDTO.ok(null);
    }

}
