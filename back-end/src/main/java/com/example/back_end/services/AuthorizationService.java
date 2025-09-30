package com.example.back_end.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.context.ApplicationContext;

import com.example.back_end.dtos.request.LoginDTO;
import com.example.back_end.dtos.response.TokenDTO;
import com.example.back_end.models.User;
import com.example.back_end.repositorys.UserRepository;
import com.example.back_end.security.TokenService;

@Service
public class AuthorizationService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(AuthorizationService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ApplicationContext context;

    private AuthenticationManager manager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try{
            return userRepository.findByEmail(username);
        } catch(UsernameNotFoundException e){
            log.error(e.getMessage());
            throw new UsernameNotFoundException("Usuario não encontrado: " + username);
        } 
    }

    public TokenDTO login(LoginDTO loginDTO) {
        
        manager = context.getBean(AuthenticationManager.class);
        var authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.login(), loginDTO.password());
        var authentication = this.manager.authenticate(authenticationToken);
        var tokenJWT = tokenService.generateToken((User) authentication.getPrincipal());
        return new TokenDTO(tokenJWT);
    }

}