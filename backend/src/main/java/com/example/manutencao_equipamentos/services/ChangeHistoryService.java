package com.example.manutencao_equipamentos.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.manutencao_equipamentos.Enums.OrderStatus;
import com.example.manutencao_equipamentos.model.ChangeHistory;
import com.example.manutencao_equipamentos.model.Employee;
import com.example.manutencao_equipamentos.model.Order;
import com.example.manutencao_equipamentos.repository.ChangeHistoryRepository;

@Service
public class ChangeHistoryService {

        @Autowired
    private ChangeHistoryRepository changeHistoryRepository;

    /**
     * Registra uma mudança de status no histórico da solicitação.
     *
     * @param solicitacao   A solicitação afetada.
     * @param estadoAnterior Estado anterior da solicitação.
     * @param estadoNovo     Novo estado da solicitação.
     * @param autor          Usuário (funcionário) que realizou a alteração.
     */
    public void registrarHistorico(Order solicitacao, 
                                   OrderStatus estadoAnterior, 
                                   OrderStatus estadoNovo, 
                                   Employee autor) {

        if (solicitacao == null || estadoAnterior == null || estadoNovo == null || autor == null) {
            throw new IllegalArgumentException("Todos os parâmetros são obrigatórios para registrar o histórico.");
        }

        ChangeHistory historico = new ChangeHistory();
        historico.setOrder(solicitacao);
        historico.setEstadoAnterior(estadoAnterior);
        historico.setEstadoNovo(estadoNovo);
        historico.setDataHora(LocalDateTime.now());
        historico.setAutor(autor);

        changeHistoryRepository.save(historico);
    }

    /**
     * Consulta todo o histórico de uma solicitação específica.
     *
     * @param solicitacaoId Id da solicitação.
     * @return Lista de históricos ordenados por data decrescente.
     */
    public List<ChangeHistory> listarHistoricoPorSolicitacao(Long solicitacaoId) {
        return changeHistoryRepository.findBySolicitacaoIdOrderByDataHoraDesc(solicitacaoId);
    }
    
}
