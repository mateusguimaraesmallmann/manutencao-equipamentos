package com.example.back_end.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "client")
@Entity(name = "client")
public class Client extends User {

    @Column(name = "cpf", unique = true)
    @JsonProperty("document")
    private String cpf;

    @Column(name = "phone")
    @JsonProperty("phone")
    private String phone;

    @Embedded
    @JsonUnwrapped
    private Endereco endereco;

    @Transient
    @JsonProperty("user")
    public User getUser() {
        User user = new User();
        user.setId(this.getId());
        user.setName(this.getName());
        user.setEmail(this.getEmail());
        user.setRole(this.getRole());
        // user.setEmployeeId(this.getEmployeeId());
        // user.setClientId(this.getClientId());

        return user;
    }

}
