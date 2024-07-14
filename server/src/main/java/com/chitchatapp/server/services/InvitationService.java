package com.chitchatapp.server.services;

import java.util.List;
import java.util.Random;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.chitchatapp.server.dtos.InvitationDTO;
import com.chitchatapp.server.forms.CreateInvitationForm;
import com.chitchatapp.server.models.Invitation;
import com.chitchatapp.server.repositories.InvitationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InvitationService {

    private final InvitationRepository invitationRepository;

    public List<InvitationDTO> retrieveInvitations() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int userId = Integer.parseInt(jwt.getSubject());

        List<Invitation> invitations = invitationRepository.findAllByCreatorId(userId);

        return invitations.stream().map((invitation) -> invitation.toDTO()).toList();
    }

    public InvitationDTO createInvitation(CreateInvitationForm form) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int userId = Integer.parseInt(jwt.getSubject());

        Random random = new Random();
        char[] alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".toCharArray();
        String inviteCode = NanoIdUtils.randomNanoId(random, alphabet, 16);

        Invitation invitation = invitationRepository.addInvitation(inviteCode, form.getLimit(), userId);

        return invitation.toDTO();
    }

    public void revokeInvitation(int invitationId) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int userId = Integer.parseInt(jwt.getSubject());

        invitationRepository.revokeInvitation(invitationId, userId);
    }

}
