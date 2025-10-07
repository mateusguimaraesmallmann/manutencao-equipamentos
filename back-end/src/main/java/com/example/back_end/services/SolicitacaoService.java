package com.example.back_end.services;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back_end.enums.EstadoSolicitacao;
import com.example.back_end.models.HistoricoAlteracao;
import com.example.back_end.models.Solicitacao;
import com.example.back_end.models.User;
import com.example.back_end.repositorys.HistoricoAlteracaoRepository;
import com.example.back_end.repositorys.SolicitacaoRepository;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private HistoricoAlteracaoRepository historicoAlteracaoRepository;

    public Solicitacao criarSolicitacao(Solicitacao order) {
        order.setEstado(EstadoSolicitacao.ABERTA);
        order.setCreatedAt(LocalDateTime.now());
        Solicitacao nova = solicitacaoRepository.save(order);
        registrarHistorico(nova, null, EstadoSolicitacao.ABERTA, null);
        return nova;
    }

    public Solicitacao buscarDetalhada(Long id) {
        return solicitacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
    }

    public void aprovar(Long id, User user) {
        Solicitacao order = buscarDetalhada(id);
        EstadoSolicitacao anterior = order.getEstado();
        order.setEstado(EstadoSolicitacao.APROVADA);
        solicitacaoRepository.save(order);
        registrarHistorico(order, anterior, EstadoSolicitacao.APROVADA, user);
    }

    public void rejeitar(Long id, String motivo, User user) {
        Solicitacao order = buscarDetalhada(id);
        EstadoSolicitacao anterior = order.getEstado();
        order.setEstado(EstadoSolicitacao.REJEITADA);
        solicitacaoRepository.save(order);
        registrarHistorico(order, anterior, EstadoSolicitacao.REJEITADA, user);
    }

    public void resgatar(Long id, User user) {
        Solicitacao order = buscarDetalhada(id);

        if (order.getEstado() != EstadoSolicitacao.REJEITADA) {
            throw new IllegalStateException("Somente solicitações rejeitadas podem ser resgatadas.");
        }

        EstadoSolicitacao anterior = order.getEstado();
        order.setEstado(EstadoSolicitacao.APROVADA);
        solicitacaoRepository.save(order);
        registrarHistorico(order, anterior, EstadoSolicitacao.APROVADA, user);
    }

    public void pagar(Long id, User user) {
        Solicitacao order = buscarDetalhada(id);

        if (order.getEstado() != EstadoSolicitacao.ARRUMADA) {
            throw new IllegalStateException("Só é possível pagar uma solicitação arrumada.");
        }

        order.setEstado(EstadoSolicitacao.PAGA);
        order.setPagaEm(LocalDateTime.now());
        solicitacaoRepository.save(order);
        registrarHistorico(order, EstadoSolicitacao.ARRUMADA, EstadoSolicitacao.PAGA, user);
    }

    private void registrarHistorico(Solicitacao solicitacao, EstadoSolicitacao anterior, EstadoSolicitacao novo,
            User user) {
        HistoricoAlteracao historico = new HistoricoAlteracao();
        historico.setSolicitacao(solicitacao);
        historico.setEstadoAnterior(anterior);
        historico.setEstadoNovo(novo);
        historico.setDataHora(LocalDateTime.now());
        historico.setAutor(user);
        historicoAlteracaoRepository.save(historico);
    }

    /*
     * public Solicitacao criarSolicitacao(Solicitacao order) {
     * order.setEstado(EstadoSolicitacao.ABERTA);
     * order.setCreatedAt(LocalDateTime.now());
     * Solicitacao nova = solicitacaoRepository.save(order);
     * registrarHistorico(nova, null, EstadoSolicitacao.ABERTA, null);
     * return nova;
     * }
     * 
     * public Solicitacao buscarDetalhada(Long id) {
     * return solicitacaoRepository.findById(id)
     * .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
     * }
     * 
     * public void aprovar(Long id, User user) {
     * Solicitacao order = buscarDetalhada(id);
     * EstadoSolicitacao anterior = order.getEstado();
     * order.setEstado(EstadoSolicitacao.APROVADA);
     * solicitacaoRepository.save(order);
     * registrarHistorico(order, anterior, EstadoSolicitacao.APROVADA, user);
     * }
     * 
     * public void rejeitar(Long id, String motivo, User user) {
     * Solicitacao order = buscarDetalhada(id);
     * EstadoSolicitacao anterior = order.getEstado();
     * order.setEstado(EstadoSolicitacao.REJEITADA);
     * solicitacaoRepository.save(order);
     * registrarHistorico(order, anterior, EstadoSolicitacao.REJEITADA, user);
     * }
     * 
     * public void resgatar(Long id, User user) {
     * Solicitacao order = buscarDetalhada(id);
     * 
     * if (order.getEstado() != EstadoSolicitacao.REJEITADA) {
     * throw new
     * IllegalStateException("Somente solicitações rejeitadas podem ser resgatadas."
     * );
     * }
     * 
     * EstadoSolicitacao anterior = order.getEstado();
     * order.setEstado(EstadoSolicitacao.APROVADA);
     * solicitacaoRepository.save(order);
     * registrarHistorico(order, anterior, EstadoSolicitacao.APROVADA, user);
     * }
     * 
     * public void pagar(Long id, User user) {
     * Solicitacao order = buscarDetalhada(id);
     * 
     * if (order.getEstado() != EstadoSolicitacao.ARRUMADA) {
     * throw new
     * IllegalStateException("Só é possível pagar uma solicitação arrumada.");
     * }
     * 
     * order.setEstado(EstadoSolicitacao.PAGA);
     * order.setPagaEm(LocalDateTime.now());
     * solicitacaoRepository.save(order);
     * registrarHistorico(order, EstadoSolicitacao.ARRUMADA, EstadoSolicitacao.PAGA,
     * user);
     * }
     * 
     * private void registrarHistorico(Solicitacao solicitacao, EstadoSolicitacao
     * anterior, EstadoSolicitacao novo, User user) {
     * HistoricoAlteracao historico = new HistoricoAlteracao();
     * historico.setSolicitacao(solicitacao);
     * historico.setEstadoAnterior(anterior);
     * historico.setEstadoNovo(novo);
     * historico.setDataHora(LocalDateTime.now());
     * historico.setAutor(user);
     * historicoAlteracaoRepository.save(historico);
     * }
     */

}