package com.example.back_end.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.back_end.dtos.request.EfetuarManutencaoDTO;
import com.example.back_end.dtos.request.RedirecionarDTO;
import com.example.back_end.dtos.request.SolicitacaoCreateDTO;
import com.example.back_end.dtos.response.ClienteDTO;
import com.example.back_end.dtos.response.EnderecoDTO;
import com.example.back_end.dtos.response.HistoricoDTO;
import com.example.back_end.dtos.response.SolicitacaoClienteDetalheDTO;
import com.example.back_end.dtos.response.SolicitacaoFuncionarioResumoDTO;
import com.example.back_end.dtos.response.SolicitacaoClienteResumoDTO;
import com.example.back_end.dtos.response.SolicitacaoFuncionarioDetalheDTO;
import com.example.back_end.enums.EstadoSolicitacao;
import com.example.back_end.models.Category;
import com.example.back_end.models.EmployeeProfile;
import com.example.back_end.models.Endereco;
import com.example.back_end.models.HistoricoAlteracao;
import com.example.back_end.models.Solicitacao;
import com.example.back_end.models.User;
import com.example.back_end.repositorys.CategoryRepository;
import com.example.back_end.repositorys.EmployeeRepository;
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

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<SolicitacaoClienteResumoDTO> buscarSolicitacoesByCliente(Long idSolicitacao) {
        return solicitacaoRepository.findAllByClienteIdOrderByCreatedAtAsc(idSolicitacao)
                .stream()
                .map(s -> new SolicitacaoClienteResumoDTO(
                        s.getId(),
                        s.getCreatedAt().toString(),
                        s.getDescricaoProduto(),
                        s.getEstado()))
                .toList();
    }

    public List<SolicitacaoFuncionarioResumoDTO> buscarSolicitacoesAbertas() {
        return solicitacaoRepository.findAllByEstado(EstadoSolicitacao.ABERTA)
                .stream()
                .map(s -> new SolicitacaoFuncionarioResumoDTO(
                        s.getId(),
                        s.getCreatedAt().toString(),
                        s.getCliente().getNome(),
                        s.getDescricaoProduto(),
                        s.getEstado()))
                .toList();
    }

    public void criarSolicitacao(SolicitacaoCreateDTO dto) {

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

    }

    public SolicitacaoClienteDetalheDTO buscarSolicitacaoClientePorId(Long idSolicitacao) {
        Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitação não encontrada"));

        List<HistoricoDTO> hist = s.getHistorico().stream()
                .sorted(Comparator.comparing(HistoricoAlteracao::getDataHora))
                .map(h -> new HistoricoDTO(
                        h.getDataHora().toString(),
                        h.getEstadoAnterior(),
                        h.getEstadoNovo(),
                        h.getAutor() != null ? h.getAutor().getNome() : null))
                .toList();

        return new SolicitacaoClienteDetalheDTO(
                s.getId(),
                s.getCreatedAt().toString(),
                s.getCliente() != null ? s.getCliente().getNome() : null,
                s.getCliente() != null ? s.getCliente().getEmail() : null,
                s.getDescricaoProduto(),
                s.getDefeito(),
                s.getEstado(),
                s.getOrcamentoValor(),
                hist);
    }

    public SolicitacaoFuncionarioDetalheDTO buscarSolicitacaoFuncionarioPorId(Long idSolicitacao) {
        Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitação não encontrada"));

        User cliente = s.getCliente();
        Endereco endereco = cliente.getClienteProfile().getEndereco();

        EnderecoDTO endDTO = new EnderecoDTO(
                endereco.getCep(),
                endereco.getRua(),
                endereco.getNumero(),
                endereco.getBairro(),
                endereco.getCidade(),
                endereco.getEstado(),
                endereco.getComplemento());

        ClienteDTO cliDTO = new ClienteDTO(
                cliente.getClienteProfile().getId().toString(),
                cliente.getNome(),
                cliente.getClienteProfile().getCpf(),
                cliente.getEmail(),
                cliente.getClienteProfile().getTelefone(),
                endDTO,
                cliente.getCreatedAt().toString(),
                cliente.getAtivo());

        List<HistoricoDTO> hist = s.getHistorico().stream()
                .sorted(Comparator.comparing(HistoricoAlteracao::getDataHora))
                .map(h -> new HistoricoDTO(
                        h.getDataHora().toString(),
                        h.getEstadoAnterior(),
                        h.getEstadoNovo(),
                        h.getAutor() != null ? h.getAutor().getNome() : null))
                .toList();

        return new SolicitacaoFuncionarioDetalheDTO(
                s.getId(),
                s.getCreatedAt().toString(),
                s.getDescricaoProduto(),
                s.getDefeito(),
                s.getEstado(),
                s.getOrcamentoValor(),
                cliDTO,
                hist);

    }

    public void registrarOrcamento(Long idSolicitacao, BigDecimal valor) {
        Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (s.getEstado() != EstadoSolicitacao.ABERTA) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Só é possível orçar solicitações ABERTAS.");
        }

        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));

        EstadoSolicitacao estadoAnterior = s.getEstado();

        s.setOrcamentoValor(valor);
        s.setEstado(EstadoSolicitacao.ORCADA);
        s.setResponsavelAtual(userLogado);

        solicitacaoRepository.save(s);

        HistoricoAlteracao hist = new HistoricoAlteracao();
        hist.setSolicitacao(s);
        hist.setEstadoAnterior(estadoAnterior);
        hist.setEstadoNovo(EstadoSolicitacao.ORCADA);
        hist.setDataHora(LocalDateTime.now());
        hist.setAutor(userLogado);
        historicoAlteracaoRepository.save(hist);

    }

    public void registrarManutencao(Long idSolicitacao, EfetuarManutencaoDTO manutencaoDTO) {
        Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));

        s.setManutencaoDescricao(manutencaoDTO.descricao());
        s.setManutencaoOrientacoes(manutencaoDTO.orientacoes());
        s.setManutencaoData(LocalDate.now());

        EstadoSolicitacao estadoAnterior = s.getEstado();
        s.setEstado(EstadoSolicitacao.ARRUMADA);

        solicitacaoRepository.save(s);

        HistoricoAlteracao hist = new HistoricoAlteracao();
        hist.setSolicitacao(s);
        hist.setEstadoAnterior(estadoAnterior);
        hist.setEstadoNovo(s.getEstado());
        hist.setDataHora(LocalDateTime.now());
        hist.setAutor(userLogado);
        historicoAlteracaoRepository.save(hist);

    }

    public void redirecionar(Long idSolicitacao, RedirecionarDTO redirecionarDTO) {
        Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));

        EmployeeProfile func = employeeRepository.findById(redirecionarDTO.funcionarioDestinoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // Regra: não redirecionar para si mesmo (origem == destino)
        if (Objects.equals(userLogado.getId(), func.getUser().getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível redirecionar para si mesmo.");
        }

        // (Opcional) Evitar redirecionar para o mesmo responsável atual
        if (s.getResponsavelAtual() != null
                && Objects.equals(s.getResponsavelAtual().getId(), func.getUser().getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Solicitação já está com esse responsável.");
        }

        EstadoSolicitacao estadoAnterior = s.getEstado();

        s.setResponsavelAtual(func.getUser());
        s.setEstado(EstadoSolicitacao.REDIRECIONADA);

        solicitacaoRepository.save(s);

        HistoricoAlteracao hist = new HistoricoAlteracao();
        hist.setSolicitacao(s);
        hist.setEstadoAnterior(estadoAnterior);
        hist.setEstadoNovo(s.getEstado());
        hist.setDataHora(LocalDateTime.now());
        hist.setAutor(userLogado);
        hist.setDestino(func.getUser());
        historicoAlteracaoRepository.save(hist);

    }

    public void aprovar(Long idSolicitacao) {
        Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));

        EstadoSolicitacao estadoAnterior = s.getEstado();
        s.setEstado(EstadoSolicitacao.APROVADA);

        solicitacaoRepository.save(s);

        HistoricoAlteracao hist = new HistoricoAlteracao();
        hist.setSolicitacao(s);
        hist.setEstadoAnterior(estadoAnterior);
        hist.setEstadoNovo(s.getEstado());
        hist.setDataHora(LocalDateTime.now());
        hist.setAutor(userLogado);
        historicoAlteracaoRepository.save(hist);

    }

    public void rejeitar(Long idSolicitacao) {
        Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));

        EstadoSolicitacao estadoAnterior = s.getEstado();
        s.setEstado(EstadoSolicitacao.REJEITADA);

        solicitacaoRepository.save(s);

        HistoricoAlteracao hist = new HistoricoAlteracao();
        hist.setSolicitacao(s);
        hist.setEstadoAnterior(estadoAnterior);
        hist.setEstadoNovo(s.getEstado());
        hist.setDataHora(LocalDateTime.now());
        hist.setAutor(userLogado);
        historicoAlteracaoRepository.save(hist);

    }

    public void resgatar(Long idSolicitacao) {
        Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));

        EstadoSolicitacao estadoAnterior = s.getEstado();
        s.setEstado(EstadoSolicitacao.APROVADA);

        solicitacaoRepository.save(s);

        HistoricoAlteracao hist = new HistoricoAlteracao();
        hist.setSolicitacao(s);
        hist.setEstadoAnterior(estadoAnterior);
        hist.setEstadoNovo(s.getEstado());
        hist.setDataHora(LocalDateTime.now());
        hist.setAutor(userLogado);
        historicoAlteracaoRepository.save(hist);

    }

    public void pagar(Long idSolicitacao) {
        Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));

        EstadoSolicitacao estadoAnterior = s.getEstado();
        s.setEstado(EstadoSolicitacao.FINALIZADA);

        solicitacaoRepository.save(s);

        HistoricoAlteracao hist = new HistoricoAlteracao();
        hist.setSolicitacao(s);
        hist.setEstadoAnterior(estadoAnterior);
        hist.setEstadoNovo(s.getEstado());
        hist.setDataHora(LocalDateTime.now());
        hist.setAutor(userLogado);
        historicoAlteracaoRepository.save(hist);

    }
    // TODO remover comentário abaixo
    /*
     * 
     * public void rejeitar(Long idSolicitacao) {
     * Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
     * .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
     * 
     * String login =
     * SecurityContextHolder.getContext().getAuthentication().getName();
     * User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
     * .orElseThrow(() -> new
     * RuntimeException("Usuário autenticado não encontrado."));
     * 
     * EstadoSolicitacao estadoAnterior = s.getEstado();
     * s.setEstado(EstadoSolicitacao.REJEITADA);
     * 
     * solicitacaoRepository.save(s);
     * 
     * HistoricoAlteracao hist = new HistoricoAlteracao();
     * hist.setSolicitacao(s);
     * hist.setEstadoAnterior(estadoAnterior);
     * hist.setEstadoNovo(s.getEstado());
     * hist.setDataHora(LocalDateTime.now());
     * hist.setAutor(userLogado);
     * historicoAlteracaoRepository.save(hist);
     * 
     * }
     * 
     * public void resgatar(Long idSolicitacao) {
     * Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
     * .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
     * 
     * String login =
     * SecurityContextHolder.getContext().getAuthentication().getName();
     * User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
     * .orElseThrow(() -> new
     * RuntimeException("Usuário autenticado não encontrado."));
     * 
     * EstadoSolicitacao estadoAnterior = s.getEstado();
     * s.setEstado(EstadoSolicitacao.APROVADA);
     * 
     * solicitacaoRepository.save(s);
     * 
     * HistoricoAlteracao hist = new HistoricoAlteracao();
     * hist.setSolicitacao(s);
     * hist.setEstadoAnterior(estadoAnterior);
     * hist.setEstadoNovo(s.getEstado());
     * hist.setDataHora(LocalDateTime.now());
     * hist.setAutor(userLogado);
     * historicoAlteracaoRepository.save(hist);
     * 
     * }
     * 
     * public void pagar(Long idSolicitacao) {
     * Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
     * .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
     * 
     * String login =
     * SecurityContextHolder.getContext().getAuthentication().getName();
     * User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
     * .orElseThrow(() -> new
     * RuntimeException("Usuário autenticado não encontrado."));
     * 
     * EstadoSolicitacao estadoAnterior = s.getEstado();
     * s.setEstado(EstadoSolicitacao.FINALIZADA);
     * 
     * solicitacaoRepository.save(s);
     * 
     * HistoricoAlteracao hist = new HistoricoAlteracao();
     * hist.setSolicitacao(s);
     * hist.setEstadoAnterior(estadoAnterior);
     * hist.setEstadoNovo(s.getEstado());
     * hist.setDataHora(LocalDateTime.now());
     * hist.setAutor(userLogado);
     * historicoAlteracaoRepository.save(hist);
     * 
     * }
     * 
     * public void rejeitar(Long idSolicitacao) {
     * Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
     * .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
     * 
     * String login =
     * SecurityContextHolder.getContext().getAuthentication().getName();
     * User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
     * .orElseThrow(() -> new
     * RuntimeException("Usuário autenticado não encontrado."));
     * 
     * EstadoSolicitacao estadoAnterior = s.getEstado();
     * s.setEstado(EstadoSolicitacao.REJEITADA);
     * 
     * solicitacaoRepository.save(s);
     * 
     * HistoricoAlteracao hist = new HistoricoAlteracao();
     * hist.setSolicitacao(s);
     * hist.setEstadoAnterior(estadoAnterior);
     * hist.setEstadoNovo(s.getEstado());
     * hist.setDataHora(LocalDateTime.now());
     * hist.setAutor(userLogado);
     * historicoAlteracaoRepository.save(hist);
     * 
     * }
     * 
     * public void resgatar(Long idSolicitacao) {
     * Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
     * .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
     * 
     * String login =
     * SecurityContextHolder.getContext().getAuthentication().getName();
     * User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
     * .orElseThrow(() -> new
     * RuntimeException("Usuário autenticado não encontrado."));
     * 
     * EstadoSolicitacao estadoAnterior = s.getEstado();
     * s.setEstado(EstadoSolicitacao.APROVADA);
     * 
     * solicitacaoRepository.save(s);
     * 
     * HistoricoAlteracao hist = new HistoricoAlteracao();
     * hist.setSolicitacao(s);
     * hist.setEstadoAnterior(estadoAnterior);
     * hist.setEstadoNovo(s.getEstado());
     * hist.setDataHora(LocalDateTime.now());
     * hist.setAutor(userLogado);
     * historicoAlteracaoRepository.save(hist);
     * 
     * }
     * 
     * public void pagar(Long idSolicitacao) {
     * Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
     * .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
     * 
     * String login =
     * SecurityContextHolder.getContext().getAuthentication().getName();
     * User userLogado = Optional.ofNullable(userRepository.findByEmail(login))
     * .orElseThrow(() -> new
     * RuntimeException("Usuário autenticado não encontrado."));
     * 
     * EstadoSolicitacao estadoAnterior = s.getEstado();
     * s.setEstado(EstadoSolicitacao.FINALIZADA);
     * 
     * solicitacaoRepository.save(s);
     * 
     * HistoricoAlteracao hist = new HistoricoAlteracao();
     * hist.setSolicitacao(s);
     * hist.setEstadoAnterior(estadoAnterior);
     * hist.setEstadoNovo(s.getEstado());
     * hist.setDataHora(LocalDateTime.now());
     * hist.setAutor(userLogado);
     * historicoAlteracaoRepository.save(hist);
     * 
     * }
     */

}