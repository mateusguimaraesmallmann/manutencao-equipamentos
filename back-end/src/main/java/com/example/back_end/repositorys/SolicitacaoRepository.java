package com.example.back_end.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.back_end.models.Solicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    @Query(" SELECT s FROM Solicitacao s WHERE s.cliente = :user ORDER BY s.createdAt asc")
    List<Solicitacao> listSolicitacoesByCliente(@Param("user") Long id);
    
}