package com.chitchatzone.server.services;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatzone.server.forms.SendMessageForm;
import com.chitchatzone.server.models.Message;
import com.chitchatzone.server.repositories.DirectMessageRepository;
import com.chitchatzone.server.repositories.MemberRepository;
import com.chitchatzone.server.repositories.RoomMessageRepository;
import com.chitchatzone.server.repositories.RoomRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {

    private final DirectMessageRepository directMessageRepository;
    private final RoomMessageRepository roomMessageRepository;
    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;

    public List<Message> retrieveDirectMessages(int userId, int cursor) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        return directMessageRepository.findAll(sub, userId, cursor);
    }

    public Message sendDirectMessage(int userId, SendMessageForm form) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        return directMessageRepository.createMessage(sub, userId, form.getBody());
    }

    public List<Message> retrieveRoomMessages(int roomId, int cursor) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());


        boolean isPrivate = roomRepository.isRoomPrivate(roomId);

        if (isPrivate) {
            boolean isMember = memberRepository.isUserMemberOfRoom(sub, roomId);

            if (!isMember) {
                throw new Exception("Not authorized to see messages of that room");
            }
        }

        return roomMessageRepository.findAll(roomId, cursor);
    }

    public Message sendRoomMessage(int roomId, SendMessageForm form) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        boolean isPrivate = roomRepository.isRoomPrivate(roomId);

        if (isPrivate) {
            boolean isMember = memberRepository.isUserMemberOfRoom(sub, roomId);

            if (!isMember) {
                throw new Exception("Not authorized to send messages on that room");
            }
        }

        return roomMessageRepository.createMessage(sub, roomId, form.getBody());
    }
}
