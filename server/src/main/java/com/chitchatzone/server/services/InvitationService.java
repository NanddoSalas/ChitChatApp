package com.chitchatzone.server.services;

import java.util.List;
import java.util.Random;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.chitchatzone.server.dtos.InvitationDTO;
import com.chitchatzone.server.forms.CreateInvitationForm;
import com.chitchatzone.server.models.Invitation;
import com.chitchatzone.server.repositories.InvitationRepository;

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
