package com.example.back_end.services;

import com.example.back_end.dtos.LoginDTO;
import com.example.back_end.dtos.TokenDTO;
import com.example.back_end.repositorys.UserRepository;
import com.example.back_end.security.TokenService;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(AuthorizationService.class);

    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public AuthorizationService(UserRepository userRepository, TokenService tokenService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .map(user -> (UserDetails) user)
                .orElseThrow(() -> {
                    log.warn("Usuário não encontrado: {}", username);
                    return new UsernameNotFoundException("Usuário não encontrado: " + username);
                });
    }

    public TokenDTO login(LoginDTO loginDTO) {
        log.debug("Autenticando usuário: {}", loginDTO.login());
        var authToken = new UsernamePasswordAuthenticationToken(
                loginDTO.login(), loginDTO.password());

        var authentication = authenticationManager.authenticate(authToken);

        var principal = (UserDetails) authentication.getPrincipal();
        var jwt = tokenService.generateToken(principal);

        return new TokenDTO(jwt);
    }
}
