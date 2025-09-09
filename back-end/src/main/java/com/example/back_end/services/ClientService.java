package com.example.back_end.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back_end.dtos.ClientDTO;
import com.example.back_end.dtos.EmployeeCreateDTO;
import com.example.back_end.dtos.EmployeeDTO;
import com.example.back_end.dtos.RegisterDTO;
import com.example.back_end.enums.Tipo;
import com.example.back_end.exceptions.DuplicateCpfException;
import com.example.back_end.models.ClienteProfile;
import com.example.back_end.models.Employee;
import com.example.back_end.repositorys.ClientRepository;
import com.example.back_end.repositorys.EmployeeRepository;

import jakarta.transaction.Transactional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository; 
    
    @Transactional
    public ClientDTO register(RegisterDTO dto) {

        if (clientRepository.existsByCpf(dto.cpf()) 
            || clientRepository.existsByEmail(dto.email())) {
            throw new DuplicateCpfException("Usuário já cadastrado.");
        }

        ClienteProfile entity = new ClienteProfile();
        entity.setCpf(dto.cpf());
        entity.setNome(dto.nome().trim());
        entity.setEmail(dto.email().toLowerCase().trim());
        entity.setTelefone(dto.telefone());
        entity.setCep(dto.cep());
        entity.setNumero(dto.numero().trim());
        entity.setComplemento(dto.complemento() == null ? null : dto.complemento().trim());
        entity.setCidade(dto.cidade().trim());
        entity.setEstado(dto.estado().toUpperCase());

        ClienteProfile saved = clientRepository.save(entity);

        return new ClientDTO(saved.getId(),
            saved.getCpf(),
            saved.getNome(),
            saved.getEmail(),
            saved.getTelefone(),
            saved.getCep(),
            saved.getNumero(),
            saved.getComplemento(),
            saved.getCidade(),
            saved.getEstado()
        );
    }
    
}