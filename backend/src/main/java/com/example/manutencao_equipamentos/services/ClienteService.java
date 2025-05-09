package com.example.manutencao_equipamentos.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.manutencao_equipamentos.Enums.Tipo;
import com.example.manutencao_equipamentos.dto.AutocadastroDTO;
import com.example.manutencao_equipamentos.model.Cliente;
import com.example.manutencao_equipamentos.repository.ClienteRepository;
import com.example.manutencao_equipamentos.repository.UsuarioRepository;

@Service
public class ClienteService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    
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

        if (clienteRepository.existsByCpf(dto.cpf())) {
            throw new RuntimeException("CPF já cadastrado");
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
        cliente.setPassword(passwordEncoder.encode(senha));
        cliente.setRole(Tipo.CLIENTE);

        clienteRepository.save(cliente);
        emailService.enviar(dto.email(), "Cadastro realizado com sucesso", getMensagemEmail(dto.nome(), senha));
    }

    private String gerarSenhaAleatoria() {
        return String.format("%04d", new Random().nextInt(10000));
    }

    private String getMensagemEmail(String nome, String senha){
        return String.format(
        "Olá %s,\n\nSeu cadastro foi realizado com sucesso no sistema.\nSua senha de acesso é: %s\n\nRecomendamos alterá-la após o primeiro acesso.",
                    nome, senha);
    }

}