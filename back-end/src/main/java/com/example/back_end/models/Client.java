package com.example.back_end.models;

import java.beans.Transient;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
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
    public User gerUser() {
        User user = new User();
        user.setId(this.getId());
        user.setName(this.getName());
        user.setEmail(this.getEmail());
        user.setRole(this.getRole());
        //user.setEmployeeId(this.getEmployeeId());
        //user.setClientId(this.GetClientId());

        return user;
    }


}
