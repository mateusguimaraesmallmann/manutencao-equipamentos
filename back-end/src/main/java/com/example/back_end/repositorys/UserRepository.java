package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.back_end.models.User;

public interface  UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    boolean existsByEmail(String email);
    
}