package com.chitchatzone.server.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatzone.server.models.User;
import com.chitchatzone.server.repositories.mappers.UserMapper;

@Repository
public class UserRepository {

    private final JdbcTemplate template;
    private final UserMapper mapper;

    public UserRepository(JdbcTemplate template, UserMapper mapper) {
        this.template = template;
        this.mapper = mapper;
    }

    public List<User> findAll() {
        String sql = "select * from users;";

        return template.query(sql, mapper);
    }
}
