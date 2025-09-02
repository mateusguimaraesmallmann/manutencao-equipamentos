package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.back_end.models.User;

public interface  UsuarioRepository extends JpaRepository<User, String> {

    UserDetails findByEmail(String email);
    boolean existsByEmail(String email);
    
}