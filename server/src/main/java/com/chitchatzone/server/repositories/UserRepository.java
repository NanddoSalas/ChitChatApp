package com.chitchatzone.server.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.chitchatzone.server.models.User;
import com.chitchatzone.server.repositories.mappers.UserMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class UserRepository {

  private final JdbcTemplate template;
  private final UserMapper mapper;

  public List<User> findAll() {
    String sql = "select * from users;";

    return template.query(sql, mapper);
  }

}
