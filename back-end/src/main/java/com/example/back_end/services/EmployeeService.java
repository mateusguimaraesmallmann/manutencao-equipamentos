package com.example.back_end.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back_end.enums.Tipo;
import com.example.back_end.exceptions.UsuarioJaExistenteException;
import com.example.back_end.dtos.EmployeeCreateDTO;
import com.example.back_end.dtos.EmployeeDTO;
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
            .stream().map(e -> 
                new EmployeeDTO(e.getId(), e.getUser().getName(), e.getUser().getEmail(), e.getBirthday())).toList();
    }

    public EmployeeDTO buscarPorId(Long id) {
        EmployeeProfile e = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        
        return new EmployeeDTO(e.getId(), e.getUser().getName(), e.getUser().getEmail(), e.getBirthday());
    }

    @Transactional
    public EmployeeDTO criar(EmployeeCreateDTO dto) throws Exception {
        
        try {

            if (userRepository.existsByEmail(dto.email())) {
                throw new UsuarioJaExistenteException("E-mail já cadastrado.");
            }

            User user = new User();
            user.setName(dto.name().trim());
            user.setEmail(dto.email());
            user.setPassword(passwordEncoder.encode(dto.password()));
            user.setRole(Tipo.FUNCIONARIO);
            user = userRepository.save(user);

            EmployeeProfile employee = new EmployeeProfile();
            employee.setUser(user);
            employee.setBirthday(dto.birthday());

            EmployeeProfile saved = employeeRepository.save(employee);

            return new EmployeeDTO(
                saved.getId(),
                saved.getUser().getName(),
                saved.getUser().getEmail(),
                saved.getBirthday());

        } catch(Exception ex) {
            logger.error(ex.getMessage());
            throw new Exception("Erro ao realizar o cadastro do funcionário!");
        }

    }

    public void excluir(Long id, Long idUsuarioAtual) {
        if (id.equals(idUsuarioAtual)) {
            throw new RuntimeException("Você não pode se excluir.");
        }

        long total = employeeRepository.count();
        if (total <= 1) {
            throw new RuntimeException("Não é possível remover o único funcionário do sistema.");
        }

        Optional<EmployeeProfile> func = employeeRepository.findById(id);
        if(func.isPresent()) {
            userRepository.deleteById(func.get().getUser().getId());
        } else {
            throw new RuntimeException("Funcionário não encontrado no sistema.");
        }
    }
    
}