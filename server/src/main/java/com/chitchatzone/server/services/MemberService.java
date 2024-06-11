package com.chitchatzone.server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.chitchatzone.server.models.Member;
import com.chitchatzone.server.repositories.MemberRepository;
import com.chitchatzone.server.repositories.RoomRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;

    public List<Member> retrieveRoomMembers(int roomId) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        boolean isMember = memberRepository.isUserMemberOfRoom(sub, roomId);

        if (!isMember) {
            return new ArrayList<>();
        }

        return memberRepository.findAllByRoomId(roomId);
    }

    public Member addUserToRoom(int roomId, int userId) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        boolean isOwner = roomRepository.isUserOwnerOfRoom(sub, roomId);

        if (!isOwner) {
            // todo: throw not authorized
            throw new Exception("Not authorized to modify that resource");
        }

        return memberRepository.addMember(userId, roomId);
    }

    public void kickUserOutOfARoom(int roomId, int userId) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        int sub = Integer.parseInt(jwt.getSubject());

        boolean isOwner = roomRepository.isUserOwnerOfRoom(sub, roomId);

        if (!isOwner) {
            // todo: throw not authorized
            throw new Exception("Not authorized to modify that resource");
        }

        memberRepository.deleteMember(userId, roomId);
    }

}
