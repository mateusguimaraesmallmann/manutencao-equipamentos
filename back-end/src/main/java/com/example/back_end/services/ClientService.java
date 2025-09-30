package com.example.back_end.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back_end.dtos.request.RegisterDTO;
import com.example.back_end.dtos.response.ClienteDTO;
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

    public List<ClienteDTO> listar() {
        return clientRepository.findAll()
            .stream().map(c -> 
                new ClienteDTO(c.getId(), c.getCpf(), c.getUser().getNome(), c.getUser().getEmail(), c.getTelefone(), 
                    c.getEndereco().getCep(), c.getEndereco().getNumero(), c.getEndereco().getComplemento(), 
                    c.getEndereco().getCidade(), c.getEndereco().getEstado() )).toList();
    }

    public ClienteDTO buscarPorId(Long id) {
        ClienteProfile c = clientRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        
        return new ClienteDTO(c.getId(), c.getCpf(), c.getUser().getNome(), c.getUser().getEmail(), c.getTelefone(), 
                    c.getEndereco().getCep(), c.getEndereco().getNumero(), c.getEndereco().getComplemento(), 
                    c.getEndereco().getCidade(), c.getEndereco().getEstado() );
    }
    
    @Transactional
    public ClienteDTO register(RegisterDTO dto) throws Exception {

        try {

            if (userRepository.existsByEmail(dto.email())) {
                throw new UsuarioJaExistenteException("E-mail já cadastrado.");
            }
            if (clientRepository.existsByCpf(dto.cpf())) {
                throw new UsuarioJaExistenteException("CPF já cadastrado.");
            }

            String password = GeneratePassword.generatePassword();

            User user = new User();
            user.setNome(dto.nome().trim());
            user.setEmail(dto.email());
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(Tipo.CLIENTE);
            user = userRepository.save(user);

            ClienteProfile profile = new ClienteProfile();
            profile.setUser(user);
            profile.setCpf(dto.cpf());
            profile.setTelefone(dto.telefone().trim());

            Endereco end = new Endereco();
            end.setCep(dto.cep().trim());
            end.setNumero(dto.numero());
            end.setComplemento(dto.complemento());
            end.setCidade(dto.cidade());
            end.setEstado(dto.estado());

            profile.setEndereco(end);

            ClienteProfile saved = clientRepository.save(profile);

            //emailService.sendPasswordEmail(dto.email(), password);
            System.out.println("Senha criada: " + password);

            return new ClienteDTO(
                saved.getId(),
                saved.getCpf(),
                user.getNome(),
                user.getEmail(),
                saved.getTelefone(),
                saved.getEndereco().getCep(),
                saved.getEndereco().getNumero(),
                saved.getEndereco().getComplemento(),
                saved.getEndereco().getCidade(),
                saved.getEndereco().getEstado());

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