package com.example.back_end.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.ClienteProfile;

public interface ClientRepository extends JpaRepository<ClienteProfile, Long>{

    Optional<ClienteProfile> findByCpf(String cpf);
    Optional<ClienteProfile> findByEmail(String email);

    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
    
}