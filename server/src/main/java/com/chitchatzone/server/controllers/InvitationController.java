package com.chitchatzone.server.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chitchatzone.server.dtos.InvitationDTO;
import com.chitchatzone.server.dtos.ResponseDTO;
import com.chitchatzone.server.forms.CreateInvitationForm;
import com.chitchatzone.server.services.InvitationService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/invitations")
@AllArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> retrieveInvitation() {
        List<InvitationDTO> invitationDTOs = invitationService.retrieveInvitations();

        return ResponseDTO.ok(invitationDTOs);
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> createInvitation(
            @Valid @RequestBody CreateInvitationForm form) {
        InvitationDTO invitationDTO = invitationService.createInvitation(form);

        return ResponseDTO.ok(invitationDTO);
    }

    @DeleteMapping("{invitationId}")
    public ResponseEntity<ResponseDTO> revokeInvitation(@PathVariable String invitationId) {
        invitationService.revokeInvitation(Integer.parseInt(invitationId));

        return ResponseDTO.ok(null);
    }

}
