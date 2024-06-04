package com.chitchatzone.server.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chitchatzone.server.dtos.UserDTO;
import com.chitchatzone.server.models.User;
import com.chitchatzone.server.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDTO> retrieveUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map((user) -> user.toDTO()).toList();
    }

}
