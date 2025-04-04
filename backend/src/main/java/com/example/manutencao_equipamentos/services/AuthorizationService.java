package com.example.manutencao_equipamentos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.manutencao_equipamentos.dto.LoginDTO;
import com.example.manutencao_equipamentos.dto.TokenDTO;
import com.example.manutencao_equipamentos.model.Usuario;
import com.example.manutencao_equipamentos.repository.UsuarioRepository;
import com.example.manutencao_equipamentos.security.TokenService;

@Service
public class AuthorizationService implements UserDetailsService{

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    TokenService tokenService;

    private AuthenticationManager manager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByLogin(username);
    }

    public TokenDTO login(LoginDTO loginDTO) {
        
        var authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.login(), loginDTO.password());
        var authentication = this.manager.authenticate(authenticationToken);
        var tokenJWT = tokenService.generateToken((Usuario) authentication.getPrincipal());
        return new TokenDTO(tokenJWT.toString());
    }
    
}