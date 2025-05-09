package com.example.manutencao_equipamentos.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.manutencao_equipamentos.Enums.EstadoSolicitacaoEnum;
import com.example.manutencao_equipamentos.model.Cliente;
import com.example.manutencao_equipamentos.model.Funcionario;
import com.example.manutencao_equipamentos.model.HistoricoAlteracao;
import com.example.manutencao_equipamentos.model.Solicitacao;
import com.example.manutencao_equipamentos.repository.HistoricoSolicitacaoRepository;
import com.example.manutencao_equipamentos.repository.SolicitacaoRepository;

public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private HistoricoSolicitacaoRepository historicoRepository;

    public List<Solicitacao> listarPorCliente(String clienteId) {
        return solicitacaoRepository.findByClienteIdOrderByDataHoraAsc(clienteId);
    }

    public List<Solicitacao> listarPorEstado(EstadoSolicitacaoEnum estado) {
        return solicitacaoRepository.findByEstadoOrderByDataHoraAsc(estado);
    }

    public Solicitacao abrirSolicitacao(Solicitacao solicitacao, Cliente cliente) {
        solicitacao.setCliente(cliente);
        solicitacao.setEstado(EstadoSolicitacaoEnum.ABERTA);
        solicitacao.setDataHora(LocalDateTime.now());
        Solicitacao salva = solicitacaoRepository.save(solicitacao);
        salvarHistorico(null, EstadoSolicitacaoEnum.ABERTA, null, salva);
        return salva;
    }

    private void salvarHistorico(EstadoSolicitacaoEnum anterior, EstadoSolicitacaoEnum novo, Funcionario funcionario, Solicitacao solicitacao) {
        HistoricoAlteracao h = new HistoricoAlteracao();
        h.setSolicitacao(solicitacao);
        h.setEstadoAnterior(anterior);
        h.setEstadoNovo(novo);
        h.setDataHora(LocalDateTime.now());
        h.setFuncionario(funcionario);
        historicoRepository.save(h);
    }
    
}
