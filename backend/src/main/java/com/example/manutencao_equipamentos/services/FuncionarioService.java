package com.example.manutencao_equipamentos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.manutencao_equipamentos.Enums.Tipo;
import com.example.manutencao_equipamentos.model.Funcionario;
import com.example.manutencao_equipamentos.repository.FuncionarioRepository;

public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Funcionario> listar() {
        return funcionarioRepository.findAll();
    }

    public Funcionario salvar(Funcionario funcionario) {
        if (funcionarioRepository.existsByLogin(funcionario.getLogin())) {
            throw new RuntimeException("Login já cadastrado");
        }
        funcionario.setPassword(passwordEncoder.encode(funcionario.getPassword()));
        funcionario.setRole(Tipo.FUNCIONARIO);
        return funcionarioRepository.save(funcionario);
    }

    public Funcionario atualizar(String id, Funcionario funcionario) {
        funcionario.setId(id);
        return funcionarioRepository.save(funcionario);
    }

    public void excluir(String id, String idUsuarioLogado) {
        if (id.equals(idUsuarioLogado)) {
            throw new RuntimeException("Você não pode remover a si mesmo");
        }
        if (funcionarioRepository.count() <= 1) {
            throw new RuntimeException("Não é possível remover o último funcionário do sistema");
        }
        funcionarioRepository.deleteById(id);
    }
    
}