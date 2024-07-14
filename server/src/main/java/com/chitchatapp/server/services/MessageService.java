package com.chitchatapp.server.services;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatapp.server.forms.SendMessageForm;
import com.chitchatapp.server.models.Member;
import com.chitchatapp.server.models.Message;
import com.chitchatapp.server.repositories.DirectMessageRepository;
import com.chitchatapp.server.repositories.MemberRepository;
import com.chitchatapp.server.repositories.RoomMessageRepository;
import com.chitchatapp.server.repositories.RoomRepository;
import com.chitchatapp.server.stomp.NewDirectMessagePayload;
import com.chitchatapp.server.stomp.NewRoomMessagePayload;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {

    private final DirectMessageRepository directMessageRepository;
    private final RoomMessageRepository roomMessageRepository;
    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;
    private final SimpMessagingTemplate template;

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

        Message message = directMessageRepository.createMessage(sub, userId, form.getBody());
        String payload = new NewDirectMessagePayload(message).build();

        template.convertAndSendToUser(Integer.toString(userId), "/queue/new-direct-message",
                payload);

        return message;
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

        Message message = roomMessageRepository.createMessage(sub, roomId, form.getBody());
        String payload = new NewRoomMessagePayload(roomId, message).build();

        if (isPrivate) {
            List<Member> members = memberRepository.findAllByRoomId(roomId);

            for (Member member : members) {
                String id = Integer.toString(member.getUserId());

                template.convertAndSendToUser(id, "/queue/new-private-room-message", payload);
            }
        } else {
            template.convertAndSend("/topic/new-room-message", payload);
        }

        return message;
    }
}
