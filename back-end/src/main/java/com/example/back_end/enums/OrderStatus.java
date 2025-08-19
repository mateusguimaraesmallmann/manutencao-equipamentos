package com.example.back_end.enums;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OrderStatus {
    ORCADA("ORÇADA"),
    APROVADA("APROVADA"),
    ABERTA("ABERTA"),
    REJEITADA("REJEITADA"),
    REDIRECIONADA("REDIRECIONADA"),
    PAGA("PAGA"),
    FINALIZADA("FINALIZADA"),
    ARRUMADA("ARRUMADA");

    private final String label;

    OrderStatus(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static OrderStatus fromLabel(String label) {
        for (OrderStatus e : values()) {
            if (e.label.equals(label)) {
                return e;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + label);
    }
}