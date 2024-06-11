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

import com.chitchatzone.server.dtos.AddUserToRoomForm;
import com.chitchatzone.server.dtos.ResponseDTO;
import com.chitchatzone.server.models.Member;
import com.chitchatzone.server.services.MemberService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/rooms/{roomId}/members")
@AllArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> retrieveRoomMembers(@PathVariable String roomId) {
        List<Member> members = memberService.retrieveRoomMembers(Integer.parseInt(roomId));
        return ResponseDTO.ok(members);
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> addUserToRoom(@PathVariable String roomId,
            @Valid @RequestBody AddUserToRoomForm addUserToRoomForm) throws Exception {
        Member member = memberService.addUserToRoom(Integer.parseInt(roomId),
                addUserToRoomForm.getUserId());
        return ResponseDTO.ok(member);
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<ResponseDTO> kickUserOutOfARoom(@PathVariable String roomId,
            @PathVariable String userId) throws NumberFormatException, Exception {
        memberService.kickUserOutOfARoom(Integer.parseInt(roomId), Integer.parseInt(userId));
        return ResponseDTO.ok(null);
    }

}
