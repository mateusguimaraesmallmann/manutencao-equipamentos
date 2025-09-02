package com.example.back_end.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back_end.dtos.AutocadastroDTO;
import com.example.back_end.models.Client;
import com.example.back_end.repositorys.ClientRepository;
import com.example.back_end.repositorys.UsuarioRepository;

@Service
public class ClientService {

        @Autowired
        private UsuarioRepository usuarioRepository;

        @Autowired
        private ClientRepository clienteRespositoy;

        @Autowired
        private EmailService emailService;

        public Client autocadastrar(AutocadastroDTO dto){
            
        }

}
