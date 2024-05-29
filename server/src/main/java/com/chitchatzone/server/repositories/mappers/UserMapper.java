package com.chitchatzone.server.repositories.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.chitchatzone.server.models.User;

@Component
public class UserMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();

        user.setId(rs.getInt("id"));
        user.setFullName(rs.getString("full_name"));
        user.setEmail(rs.getString("email"));
        user.setAvatar(rs.getString("avatar"));
        user.setAbout(rs.getString("about"));
        user.setRole(rs.getString("server_role"));
        user.setJoinedDate(rs.getString("joined_date"));
        user.setPassword(rs.getString("encrypted_password"));
        user.setGoogleId(rs.getString("google_id"));
        user.setGithubId(rs.getString("github_id"));

        return user;
    }

}
