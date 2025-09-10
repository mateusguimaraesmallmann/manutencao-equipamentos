package com.example.back_end.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.ClienteProfile;

public interface ClientRepository extends JpaRepository<ClienteProfile, Long>{

    boolean existsByCpf(String cpf);

    Optional<ClienteProfile> findByCpf(String cpf);
   
}