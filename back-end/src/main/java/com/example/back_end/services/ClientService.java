package com.example.back_end.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back_end.dtos.ClientDTO;
import com.example.back_end.dtos.RegisterDTO;
import com.example.back_end.enums.Tipo;
import com.example.back_end.exceptions.UsuarioJaExistenteException;
import com.example.back_end.models.ClienteProfile;
import com.example.back_end.models.Endereco;
import com.example.back_end.models.User;
import com.example.back_end.repositorys.ClientRepository;
import com.example.back_end.repositorys.UserRepository;
import com.example.back_end.utils.GeneratePassword;

import jakarta.transaction.Transactional;

@Service
public class ClientService {

    private static final Logger logger = LoggerFactory.getLogger(ClientService.class);

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public List<ClientDTO> listar() {
        return clientRepository.findAll()
            .stream().map(c -> 
                new ClientDTO(c.getId(), c.getCpf(), c.getUser().getName(), c.getUser().getEmail(), c.getPhone(), 
                    c.getEndereco().getZipCode(), c.getEndereco().getNumber(), c.getEndereco().getComplement(), 
                    c.getEndereco().getCity(), c.getEndereco().getState() )).toList();
    }

    public ClientDTO buscarPorId(Long id) {
        ClienteProfile c = clientRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        
        return new ClientDTO(c.getId(), c.getCpf(), c.getUser().getName(), c.getUser().getEmail(), c.getPhone(), 
                    c.getEndereco().getZipCode(), c.getEndereco().getNumber(), c.getEndereco().getComplement(), 
                    c.getEndereco().getCity(), c.getEndereco().getState());
    }
    
    @Transactional
    public ClientDTO register(RegisterDTO dto) throws Exception {

        try {

            if (userRepository.existsByEmail(dto.email())) {
                throw new UsuarioJaExistenteException("E-mail já cadastrado.");
            }
            if (clientRepository.existsByCpf(dto.cpf())) {
                throw new UsuarioJaExistenteException("CPF já cadastrado.");
            }

            String password = GeneratePassword.generatePassword();

            User user = new User();
            user.setName(dto.nome().trim());
            user.setEmail(dto.email());
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(Tipo.CLIENTE);
            user = userRepository.save(user);

            ClienteProfile profile = new ClienteProfile();
            profile.setUser(user);
            profile.setCpf(dto.cpf());
            profile.setPhone(dto.telefone().trim());

            Endereco end = new Endereco();
            end.setZipCode(dto.cep().trim());
            end.setNumber(dto.numero());
            end.setComplement(dto.complemento());
            end.setCity(dto.cidade());
            end.setState(dto.estado());

            profile.setEndereco(end);

            ClienteProfile saved = clientRepository.save(profile);

            //emailService.sendPasswordEmail(dto.email(), password);
            System.out.println("Senha criada: " + password);

            return new ClientDTO(
                saved.getId(),
                saved.getCpf(),
                user.getName(),
                user.getEmail(),
                saved.getPhone(),
                saved.getEndereco().getZipCode(),
                saved.getEndereco().getNumber(),
                saved.getEndereco().getComplement(),
                saved.getEndereco().getCity(),
                saved.getEndereco().getState());

        } catch (Exception ex) {
            logger.error(ex.getMessage());
            throw new Exception("Erro ao realizar o cadastro do cliente!");
        }

    }

    public void excluir(Long id, Long idUsuarioAtual) {
        if (id.equals(idUsuarioAtual)) {
            throw new RuntimeException("Você não pode se excluir.");
        }

        Optional<ClienteProfile> client = clientRepository.findById(id);
        if(client.isPresent()) {
            userRepository.deleteById(client.get().getUser().getId());
        } else {
            throw new RuntimeException("Cliente não encontrado no sistema.");
        }
    }
    
}