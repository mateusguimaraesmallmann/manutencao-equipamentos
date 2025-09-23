package com.example.back_end.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.back_end.dtos.LoginDTO;
import com.example.back_end.dtos.TokenDTO;
import com.example.back_end.repositorys.UserRepository;
import com.example.back_end.security.TokenService;

@Service
public class AuthorizationService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(AuthorizationService.class);

    private UserRepository userRepository;
    private TokenService tokenService;
    private AuthenticationManager authenticationManager;

    public AuthorizationService(UserRepository userRepository, TokenService tokenService,
            AuthenticationManager authenticationManager) {
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
        String jwt = tokenService.generateToken(principal);

        return new TokenDTO(jwt);
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public TokenService getTokenService() {
        return tokenService;
    }

    public void setTokenService(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    public AuthenticationManager getAuthenticationManager() {
        return authenticationManager;
    }

    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
}
