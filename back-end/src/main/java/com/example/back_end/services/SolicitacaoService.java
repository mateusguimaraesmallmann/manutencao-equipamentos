package com.example.back_end.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.back_end.dtos.request.SolicitacaoCreateDTO;
import com.example.back_end.dtos.response.SolicitacaoDTO;
import com.example.back_end.enums.EstadoSolicitacao;
import com.example.back_end.models.Category;
import com.example.back_end.models.HistoricoAlteracao;
import com.example.back_end.models.Solicitacao;
import com.example.back_end.models.User;
import com.example.back_end.repositorys.CategoryRepository;
import com.example.back_end.repositorys.HistoricoAlteracaoRepository;
import com.example.back_end.repositorys.SolicitacaoRepository;
import com.example.back_end.repositorys.UserRepository;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private HistoricoAlteracaoRepository historicoAlteracaoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public SolicitacaoDTO criarSolicitacao(SolicitacaoCreateDTO dto) {
        
        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
            .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));
        
        Category categoria = categoryRepository.findById(dto.categoriaId())
            .orElseThrow(() -> new IllegalArgumentException("Categoria inválida."));
        
        Solicitacao s = new Solicitacao();
        s.setCliente(userLogado);
        s.setCategoria(categoria);
        s.setDescricaoProduto(dto.descricaoProduto());
        s.setDefeito(dto.defeito());
        s.setEstado(EstadoSolicitacao.ABERTA);
        s.setCreatedAt(LocalDateTime.now());

        Solicitacao salva = solicitacaoRepository.save(s);

        HistoricoAlteracao h = new HistoricoAlteracao();
        h.setSolicitacao(salva);
        h.setEstadoAnterior(null);
        h.setEstadoNovo(EstadoSolicitacao.ABERTA);
        h.setDataHora(LocalDateTime.now());
        h.setAutor(userLogado);
        historicoAlteracaoRepository.save(h);

        return new SolicitacaoDTO(
            salva.getId(),
            salva.getDescricaoProduto(),
            salva.getDefeito(),
            salva.getEstado().name(),
            salva.getCreatedAt().toString(),
            salva.getCategoria() != null ? salva.getCategoria().getId() : null
        );
  
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

}