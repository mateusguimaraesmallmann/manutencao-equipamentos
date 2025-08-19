package com.example.back_end.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.back_end.dtos.LoginDTO;
import com.example.back_end.dtos.TokenDTO;
import com.example.back_end.models.User;
import com.example.back_end.repositorys.UsuarioRepository;
import com.example.back_end.security.TokenService;

@Service
public class AuthorizationService implements UserDetailsService {

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
        var tokenJWT = tokenService.generateToken((User) authentication.getPrincipal());
        return new TokenDTO(tokenJWT.toString());
    }
    
}