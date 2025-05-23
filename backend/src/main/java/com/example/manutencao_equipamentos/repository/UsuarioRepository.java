package com.example.manutencao_equipamentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.manutencao_equipamentos.model.User;

public interface UsuarioRepository extends JpaRepository<User, String>{
    
    UserDetails findByLogin(String login);
}
