package com.example.back_end.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back_end.enums.Tipo;
import com.example.back_end.dtos.EmployeeCreateDTO;
import com.example.back_end.dtos.EmployeeDTO;
import com.example.back_end.models.EmployeeProfile;
import com.example.back_end.repositorys.EmployeeRepository;

@Service
public class EmployeeService {

    /*@Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<EmployeeDTO> listar() {
        return employeeRepository.findAll()
            .stream()
            .map(e -> new EmployeeDTO(e.getId(), e.getName(), e.getEmail(), e.getBirthday()))
            .toList();
    }

    public EmployeeDTO buscarPorId(Long id) {
        EmployeeProfile e = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        return new EmployeeDTO(e.getId(), e.getName(), e.getEmail(), e.getBirthday());
    }

    public EmployeeDTO criar(EmployeeCreateDTO dto) {
        if (employeeRepository.existsByLogin(dto.email())) {
            throw new RuntimeException("E-mail já cadastrado.");
        }

        EmployeeProfile e = new Employee();
        e.setName(dto.name());
        e.setEmail(dto.email());
        e.setBirthdate(dto.birthdate());
        e.setPassword(passwordEncoder.encode(dto.password()));
        e.setRole(Tipo.FUNCIONARIO);

        EmployeeProfile salvo = employeeRepository.save(e);
        return new EmployeeDTO(salvo.getId(), salvo.getName(), salvo.getEmail(), salvo.getBirthday());
    }

    public void excluir(Long id, Long idUsuarioAtual) {
        if (id.equals(idUsuarioAtual)) {
            throw new RuntimeException("Você não pode se excluir.");
        }

        long total = employeeRepository.count();
        if (total <= 1) {
            throw new RuntimeException("Não é possível remover o único funcionário do sistema.");
        }

        employeeRepository.deleteById(id);
    }*/
    
}