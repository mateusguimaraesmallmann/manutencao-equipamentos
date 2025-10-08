package com.example.back_end.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 80)
    @JsonProperty("nome")
    private String nome;

    @Column(name = "ativo", nullable = false)
    @JsonProperty("ativo")
    private Boolean ativo;

    @Column(name = "created_at", nullable = false, updatable = false)
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @JsonProperty("updatedAt")
    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) { createdAt = LocalDateTime.now(); }
        if (ativo == null) { ativo = true; }
    }

    @PreUpdate
    void onUpdate() { updatedAt = LocalDateTime.now(); }
    
}