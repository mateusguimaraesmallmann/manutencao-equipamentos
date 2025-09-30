package com.example.back_end.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Endereco {

    @Column(name = "cep", nullable = false, length = 9)
    @JsonProperty("cep")
    private String cep;

    @Column(name = "rua", nullable = false, length = 120)
    @JsonProperty("rua")
    private String rua;

    @Column(name = "numero", nullable = false, length = 10)
    @JsonProperty("numero")
    private String numero;

    @Column(name = "bairro", nullable = false, length = 80)
    @JsonProperty("bairro")
    private String bairro;

    @Column(name = "cidade", nullable = false, length = 80)
    @JsonProperty("cidade")
    private String cidade;

    @Column(name = "estado", nullable = false, length = 2)
    @JsonProperty("estado")
    private String estado;

    @Column(name = "complemento")
    @JsonProperty("complemento")
    private String complemento;
    
}