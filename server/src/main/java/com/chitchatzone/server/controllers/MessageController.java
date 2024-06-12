package com.chitchatzone.server.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chitchatzone.server.dtos.ResponseDTO;
import com.chitchatzone.server.forms.RetrieveMessagesForm;
import com.chitchatzone.server.forms.SendMessageForm;
import com.chitchatzone.server.models.Message;
import com.chitchatzone.server.services.MessageService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/users/{userId}/messages")
    public ResponseEntity<ResponseDTO> retrieveDirectMessages(@PathVariable String userId,
            @Valid @RequestBody RetrieveMessagesForm form) {
        List<Message> messages =
                messageService.retrieveDirectMessages(Integer.parseInt(userId), form);

        return ResponseDTO.ok(messages);
    }

    @PostMapping("/users/{userId}/messages")
    public ResponseEntity<ResponseDTO> sendDirectMessage(@PathVariable String userId,
            @Valid @RequestBody SendMessageForm form) {
        Message message = messageService.sendDirectMessage(Integer.parseInt(userId), form);

        return ResponseDTO.ok(message);
    }

    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<ResponseDTO> retrieveRoomMessages(@PathVariable String roomId,
            @Valid @RequestBody RetrieveMessagesForm form) throws NumberFormatException, Exception {
        List<Message> messages =
                messageService.retrieveRoomMessages(Integer.parseInt(roomId), form);

        return ResponseDTO.ok(messages);
    }

    @PostMapping("/rooms/{roomId}/messages")
    public ResponseEntity<ResponseDTO> sendRoomMessage(@PathVariable String roomId,
            @Valid @RequestBody SendMessageForm form) throws NumberFormatException, Exception {
        Message message = messageService.sendRoomMessage(Integer.parseInt(roomId), form);

        return ResponseDTO.ok(message);
    }

}
