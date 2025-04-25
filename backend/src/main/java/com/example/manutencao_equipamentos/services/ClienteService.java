package com.example.manutencao_equipamentos.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.manutencao_equipamentos.Enums.Tipo;
import com.example.manutencao_equipamentos.dto.AutocadastroDTO;
import com.example.manutencao_equipamentos.model.Cliente;
import com.example.manutencao_equipamentos.repository.ClienteRepository;
import com.example.manutencao_equipamentos.repository.UsuarioRepository;

@Service
public class ClienteService {

    @Autowired 
    private UsuarioRepository usuarioRepository;

    @Autowired 
    private ClienteRepository clienteRepository;

    @Autowired 
    private EmailService emailService;

    @Autowired 
    private ViaCepService viaCepService;

    public void autocadastrar(AutocadastroDTO dto) {
        if (usuarioRepository.findByLogin(dto.email()) != null) {
            throw new RuntimeException("Email já cadastrado");
        }

        var endereco = viaCepService.buscarEndereco(dto.cep());
        endereco.setNumero(dto.numero());
        endereco.setComplemento(dto.complemento());

        var senha = gerarSenhaAleatoria();
        var cliente = new Cliente();
        cliente.setCpf(dto.cpf());
        cliente.setNome(dto.nome());
        cliente.setLogin(dto.email());
        cliente.setTelefone(dto.telefone());
        cliente.setEndereco(endereco);
        cliente.setPassword(new BCryptPasswordEncoder().encode(senha));
        cliente.setRole(Tipo.CLIENTE);

        clienteRepository.save(cliente);
        emailService.enviar(dto.email(), "Cadastro realizado", "Sua senha: " + senha);
    }

    private String gerarSenhaAleatoria() {
        return String.format("%04d", new Random().nextInt(10000));
    }
    
}
