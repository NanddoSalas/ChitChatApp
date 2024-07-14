package com.chitchatapp.server.services;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatapp.server.dtos.MemberDTO;
import com.chitchatapp.server.models.Member;
import com.chitchatapp.server.repositories.MemberRepository;
import com.chitchatapp.server.repositories.RoomRepository;
import com.chitchatapp.server.stomp.DeleteRoomMemberPayload;
import com.chitchatapp.server.stomp.NewRoomMemberPayload;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final SimpMessagingTemplate template;

    public List<MemberDTO> retrieveRoomMembers(int roomId) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        boolean isMember = memberRepository.isUserMemberOfRoom(sub, roomId);

        if (!isMember) {
            throw new Exception("Not authorized to see room members");
        }

        List<Member> members = memberRepository.findAllByRoomId(roomId);

        return members.stream().map(member -> member.toDTO()).toList();
    }

    public Member addUserToRoom(int roomId, int userId) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        boolean isOwner = roomRepository.isUserOwnerOfRoom(sub, roomId);

        if (!isOwner) {
            throw new Exception("Not authorized to modify that resource");
        }

        Member member = memberRepository.addMember(userId, roomId);

        String payload = new NewRoomMemberPayload(roomId).build();

        template.convertAndSendToUser(Integer.toString(userId), "/queue/new-room-member", payload);

        return member;
    }

    public void kickUserOutOfARoom(int roomId, int userId) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        boolean isOwner = roomRepository.isUserOwnerOfRoom(sub, roomId);

        if (!isOwner) {
            throw new Exception("Not authorized to modify that resource");
        }

        Boolean isSuccess = memberRepository.deleteMember(userId, roomId);

        if (isSuccess) {
            String payload = new DeleteRoomMemberPayload(roomId).build();

            template.convertAndSendToUser(Integer.toString(userId), "/queue/delete-room-member",
                    payload);
        }
    }

}
