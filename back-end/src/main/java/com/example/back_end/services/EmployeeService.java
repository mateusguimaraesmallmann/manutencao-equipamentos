package com.example.back_end.services;

import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back_end.enums.Tipo;
import com.example.back_end.exceptions.UsuarioJaExistenteException;
import com.example.back_end.dtos.request.EmployeeCreateDTO;
import com.example.back_end.dtos.response.EmployeeDTO;
import com.example.back_end.models.EmployeeProfile;
import com.example.back_end.models.User;
import com.example.back_end.repositorys.EmployeeRepository;
import com.example.back_end.repositorys.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class EmployeeService {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<EmployeeDTO> listar() {
        return employeeRepository.findAll()
                .stream()
                .map(e -> new EmployeeDTO(String.valueOf(e.getId()),
                        e.getUser().getNome(),
                        e.getUser().getEmail(),
                        e.getDataNascimento().toString(),
                        e.getUser().getAtivo(),
                        e.getUser().getCreatedAt().toString(),
                        e.getUser().getUpdatedAt().toString()))
                .toList();
    }

    public EmployeeDTO buscarPorId(Long id) {
        EmployeeProfile e = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        return new EmployeeDTO(String.valueOf(e.getId()),
                e.getUser().getNome(),
                e.getUser().getEmail(),
                e.getDataNascimento().toString(),
                e.getUser().getAtivo(),
                e.getUser().getCreatedAt().toString(),
                e.getUser().getUpdatedAt().toString());
    }

    @Transactional
    public EmployeeDTO criar(EmployeeCreateDTO dto) throws Exception {

        try {

            if (userRepository.existsByEmail(dto.email())) {
                throw new UsuarioJaExistenteException("E-mail já cadastrado.");
            }

            User user = new User();
            user.setNome(dto.nome().trim());
            user.setEmail(dto.email());
            user.setPassword(passwordEncoder.encode(dto.senha()));
            user.setRole(Tipo.FUNCIONARIO);
            user = userRepository.save(user);

            EmployeeProfile employee = new EmployeeProfile();
            employee.setUser(user);
            employee.setDataNascimento(dto.dataNascimento());

            EmployeeProfile saved = employeeRepository.save(employee);

            return new EmployeeDTO(String.valueOf(saved.getId()),
                    saved.getUser().getNome(),
                    saved.getUser().getEmail(),
                    saved.getDataNascimento().toString(),
                    saved.getUser().getAtivo(),
                    saved.getUser().getCreatedAt().toString(),
                    saved.getUser().getUpdatedAt().toString());

        } catch (Exception ex) {
            logger.error(ex.getMessage());
            throw new Exception("Erro ao realizar o cadastro do funcionário!");
        }

    }

    public void excluir(Long id, Long idUsuarioAtual) {
        long total = employeeRepository.count();
        if (total <= 1) {
            throw new RuntimeException("Não é possível remover o único funcionário do sistema.");
        }
        
        var funcionario = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        if (Objects.equals(funcionario.getUser().getId(), idUsuarioAtual)) {
            throw new RuntimeException("Você não pode se excluir.");
        }

        funcionario.getUser().setAtivo(false);
        userRepository.save(funcionario.getUser());      
    }

}