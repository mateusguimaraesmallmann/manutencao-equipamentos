package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.ClienteProfile;

public interface ClientRepository extends JpaRepository<ClienteProfile, Long>{
    
}