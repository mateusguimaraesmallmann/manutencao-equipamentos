package com.example.manutencao_equipamentos.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.manutencao_equipamentos.Enums.Tipo;
import com.example.manutencao_equipamentos.dto.AutocadastroDTO;
import com.example.manutencao_equipamentos.model.Client;
import com.example.manutencao_equipamentos.model.Endereco;
import com.example.manutencao_equipamentos.repository.ClientRepository;
import com.example.manutencao_equipamentos.repository.UsuarioRepository;

@Service
public class ClientService {

    @Autowired 
    private UsuarioRepository usuarioRepository;

    @Autowired 
    private ClientRepository clientRepository;

    @Autowired 
    private EmailService emailService;

    public Client autocadastrar(AutocadastroDTO dto) {
        if (usuarioRepository.findByLogin(dto.email()) != null) {
            throw new RuntimeException("Email já cadastrado");
        }

        if (clientRepository.existsByCpf(dto.cpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }

        var senha = gerarSenhaAleatoria();
        var client = new Client();
        client.setCpf(dto.cpf());
        client.setName(dto.nome());
        client.setEmail(dto.email());
        client.setPhone(dto.telefone());
        client.setPassword(new BCryptPasswordEncoder().encode(senha));
        client.setRole(Tipo.CLIENTE);

        Endereco endereco = new Endereco();
        endereco.setZipCode(dto.cep());
        endereco.setNumber(dto.numero());
        endereco.setComplement(dto.complemento());
        endereco.setCity(dto.cidade());
        endereco.setState(dto.estado());

        client.setEndereco(endereco);
        
        clientRepository.save(client);
        emailService.enviar(dto.email(), "Cadastro realizado", "Sua senha: " + senha);

        return client;
    }

    private String gerarSenhaAleatoria() {
        return String.format("%04d", new Random().nextInt(10000));
    }
    
}
