package com.example.back_end.models;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import com.example.back_end.enums.Tipo;
import com.fasterxml.jackson.annotation.JsonFormat;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Entity(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private String email;

    private String password;
    
    @Enumerated(EnumType.ORDINAL)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER_INT)
    private Tipo role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return java.util.Collections.singletonList(
            new SimpleGrantedAuthority(role.name())
        );
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
    
}