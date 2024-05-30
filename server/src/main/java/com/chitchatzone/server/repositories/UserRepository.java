package com.chitchatzone.server.repositories;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatzone.server.repositories.mappers.UserMapper;

import lombok.Data;

@Repository
@Data
public class UserRepository {

    JdbcTemplate template;
    UserMapper mapper;

    public UserRepository(JdbcTemplate template, UserMapper mapper) {
        this.template = template;
        this.mapper = mapper;
    }

}
