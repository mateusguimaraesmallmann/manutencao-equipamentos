package com.example.back_end.models;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
@Entity(name = "employees")
public class Employee extends User {
    
    @Column(name = "birthdate", nullable = false)
    @JsonIgnore
    private LocalDate birthdate;

    @Transient
    @JsonProperty("birthday")
    public String getBirthday() {
        return birthdate != null ? birthdate.toString() : null;
    }

    @Transient
    @JsonProperty("user")
    public User getUserDto() {
        User user = new User();
        user.setId(this.getId());
        user.setName(this.getName());
        user.setEmail(this.getEmail());
        user.setRole(this.getRole());
        //user.setEmployeeId(this.getEmployeeId());
        //user.setClientId(this.getClientId());
        return user;
    }

}
