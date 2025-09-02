package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.Client;

public interface ClientRepository extends JpaRepository<Client, String> {

    boolean existsByCpf(String cpf);
    boolean existsByLogin(String login);

}
