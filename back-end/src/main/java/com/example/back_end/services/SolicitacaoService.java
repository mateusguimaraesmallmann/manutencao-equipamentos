package com.example.back_end.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
                        .stream().map(s -> new SolicitacaoClienteResumoDTO(s.getId(),
                                s.getCreatedAt().toString(), s.getDescricaoProduto(), s.getEstado())).toList();
        }

        public List<SolicitacaoFuncionarioResumoDTO> buscarSolicitacoesAbertas() {
                return solicitacaoRepository.findAllByEstado(EstadoSolicitacao.ABERTA)
                        .stream().map(s -> new SolicitacaoFuncionarioResumoDTO(s.getId(),
                                s.getCreatedAt().toString(), s.getCliente().getNome(), s.getDescricaoProduto(), s.getEstado())).toList();
        }

        public List<SolicitacaoFuncionarioResumoDTO> buscarSolicitacoesFuncionario(String modo, LocalDate inicio, LocalDate fim) {

                User userLogado = recuperarUsuarioLogado();

                Long meuId = userLogado.getId();
                List<Solicitacao> lista;

                if ("PERIODO".equalsIgnoreCase(modo) && inicio != null && fim != null) {
                        if (fim.isBefore(inicio)) { 
                                throw new IllegalArgumentException("Data fim não pode ser antes da data início."); 
                        }
                        
                        LocalDateTime ini = inicio.atStartOfDay();
                        LocalDateTime end = fim.atTime(LocalTime.MAX);
                        
                        lista = solicitacaoRepository.findAllByResponsavelAtualIdAndCreatedAtBetweenOrderByCreatedAtAsc(meuId, ini, end);

                } else if ("TODAS".equalsIgnoreCase(modo)) {
                        lista = solicitacaoRepository.findAllByResponsavelAtualIdOrderByCreatedAtAsc(meuId);

                } else {
                        LocalDate hoje = LocalDate.now();
                        LocalDateTime ini = hoje.atStartOfDay();
                        LocalDateTime end = hoje.atTime(LocalTime.MAX);
                        lista = solicitacaoRepository.findAllByResponsavelAtualIdAndCreatedAtBetweenOrderByCreatedAtAsc(meuId, ini, end);
                }

                return lista.stream()
                        .map(s -> new SolicitacaoFuncionarioResumoDTO(
                                s.getId(),
                                s.getCreatedAt() != null ? s.getCreatedAt().toString() : null,
                                s.getCliente() != null ? s.getCliente().getNome() : null,
                                s.getDescricaoProduto(),
                                s.getEstado())).toList();
        }

        public void criarSolicitacao(SolicitacaoCreateDTO dto) {

                User userLogado = recuperarUsuarioLogado();

                Category categoria = categoryRepository.findById(dto.categoriaId())
                                .orElseThrow(() -> new IllegalArgumentException("Categoria inválida."));

                Solicitacao s = new Solicitacao();
                s.setCliente(userLogado);
                s.setCategoria(categoria);
                s.setDescricaoProduto(dto.descricaoProduto());
                s.setDefeito(dto.defeito());
                s.setEstado(EstadoSolicitacao.ABERTA);
                s.setCreatedAt(LocalDateTime.now());

                solicitacaoRepository.save(s);
                salvarHistoricoSolicitacao(s, null, userLogado);
        }

        public SolicitacaoClienteDetalheDTO buscarSolicitacaoClientePorId(Long idSolicitacao) {
                
                Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitação não encontrada"));

                List<HistoricoDTO> hist = s.getHistorico()
                        .stream()
                        .sorted(Comparator.comparing(HistoricoAlteracao::getDataHora))
                        .map(h -> new HistoricoDTO(h.getDataHora().toString(),
                                h.getEstadoAnterior(),
                                h.getEstadoNovo(),
                                h.getAutor() != null ? h.getAutor().getNome() : null)).toList();

                return new SolicitacaoClienteDetalheDTO(s.getId(),
                        s.getCreatedAt().toString(), 
                        s.getCliente() != null ? s.getCliente().getNome() : null,
                        s.getCliente() != null ? s.getCliente().getEmail() : null,
                        s.getDescricaoProduto(), s.getDefeito(), s.getManutencaoDescricao(), s.getManutencaoOrientacoes(), s.getEstado(), s.getOrcamentoValor(), hist);
        }

        public SolicitacaoFuncionarioDetalheDTO buscarSolicitacaoFuncionarioPorId(Long idSolicitacao) {

                Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitação não encontrada"));

                User cliente = s.getCliente();
                Endereco endereco = cliente.getClienteProfile().getEndereco();

                EnderecoDTO endDTO = new EnderecoDTO(endereco.getCep(),
                        endereco.getRua(), endereco.getNumero(), endereco.getBairro(), endereco.getCidade(), endereco.getEstado(), endereco.getComplemento());

                ClienteDTO cliDTO = new ClienteDTO(cliente.getClienteProfile().getId().toString(),
                        cliente.getNome(), cliente.getClienteProfile().getCpf(), cliente.getEmail(), cliente.getClienteProfile().getTelefone(),
                        endDTO, cliente.getCreatedAt().toString(), cliente.getAtivo());

                List<HistoricoDTO> hist = s.getHistorico()
                        .stream()
                        .sorted(Comparator.comparing(HistoricoAlteracao::getDataHora))
                        .map(h -> new HistoricoDTO(h.getDataHora().toString(),
                                h.getEstadoAnterior(), h.getEstadoNovo(),
                                h.getAutor() != null ? h.getAutor().getNome() : null)).toList();

                return new SolicitacaoFuncionarioDetalheDTO(s.getId(),
                        s.getCreatedAt().toString(), s.getDescricaoProduto(), s.getDefeito(), s.getEstado(), s.getOrcamentoValor(), cliDTO, hist);
        }

        public void registrarOrcamento(Long idSolicitacao, BigDecimal valor) {
                
                Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                if (s.getEstado() != EstadoSolicitacao.ABERTA) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, "Só é possível orçar solicitações ABERTAS.");
                }

                User userLogado = recuperarUsuarioLogado();

                EstadoSolicitacao estadoAnterior = s.getEstado();

                s.setOrcamentoValor(valor);
                s.setEstado(EstadoSolicitacao.ORCADA);
                s.setResponsavelAtual(userLogado);

                solicitacaoRepository.save(s);
                salvarHistoricoSolicitacao(s, estadoAnterior, userLogado);
        }

        public void registrarManutencao(Long idSolicitacao, EfetuarManutencaoDTO manutencaoDTO) {
                
                Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                User userLogado = recuperarUsuarioLogado();

                s.setManutencaoDescricao(manutencaoDTO.descricao());
                s.setManutencaoOrientacoes(manutencaoDTO.orientacoes());
                s.setManutencaoData(LocalDate.now());

                EstadoSolicitacao estadoAnterior = s.getEstado();
                s.setEstado(EstadoSolicitacao.ARRUMADA);
                s.setManutencaoData(LocalDate.now());

                solicitacaoRepository.save(s);
                salvarHistoricoSolicitacao(s, estadoAnterior, userLogado);
        }

        public void redirecionar(Long idSolicitacao, RedirecionarDTO redirecionarDTO) {
                
                Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                User userLogado = recuperarUsuarioLogado();

                EmployeeProfile func = employeeRepository.findById(redirecionarDTO.funcionarioDestinoId())
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                if (Objects.equals(userLogado.getId(), func.getUser().getId())) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível redirecionar para si mesmo.");
                }

                if (s.getResponsavelAtual() != null && Objects.equals(s.getResponsavelAtual().getId(), func.getUser().getId())) {
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

                User userLogado = recuperarUsuarioLogado();

                EstadoSolicitacao estadoAnterior = s.getEstado();
                s.setEstado(EstadoSolicitacao.APROVADA);

                solicitacaoRepository.save(s);
                salvarHistoricoSolicitacao(s, estadoAnterior, userLogado);
        }

        public void rejeitar(Long idSolicitacao) {
                
                Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                User userLogado = recuperarUsuarioLogado();

                EstadoSolicitacao estadoAnterior = s.getEstado();
                s.setEstado(EstadoSolicitacao.REJEITADA);

                solicitacaoRepository.save(s);
                salvarHistoricoSolicitacao(s, estadoAnterior, userLogado);
        }

        public void resgatar(Long idSolicitacao) {
                
                Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                User userLogado = recuperarUsuarioLogado();

                EstadoSolicitacao estadoAnterior = s.getEstado();
                s.setEstado(EstadoSolicitacao.APROVADA);

                solicitacaoRepository.save(s);
                salvarHistoricoSolicitacao(s, estadoAnterior, userLogado);
        }

        public void pagar(Long idSolicitacao) {
               
                Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                User userLogado = recuperarUsuarioLogado();

                EstadoSolicitacao estadoAnterior = s.getEstado();
                s.setEstado(EstadoSolicitacao.PAGA);
                s.setPagaEm(LocalDateTime.now());

                solicitacaoRepository.save(s);
                salvarHistoricoSolicitacao(s, estadoAnterior, userLogado);
        }

        public void finalizar(Long idSolicitacao) {
                
                Solicitacao s = solicitacaoRepository.findById(idSolicitacao)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                User userLogado = recuperarUsuarioLogado();

                EstadoSolicitacao estadoAnterior = s.getEstado();
                s.setEstado(EstadoSolicitacao.FINALIZADA);
                s.setFinalizacaoData(LocalDateTime.now());

                solicitacaoRepository.save(s);
                salvarHistoricoSolicitacao(s, estadoAnterior, userLogado);
        }

        public User recuperarUsuarioLogado(){
                String login = SecurityContextHolder.getContext().getAuthentication().getName();
                return Optional.ofNullable(userRepository.findByEmail(login))
                        .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));
        }

        public void salvarHistoricoSolicitacao(Solicitacao s, EstadoSolicitacao estadoAnterior, User userLogado){
                HistoricoAlteracao hist = new HistoricoAlteracao();
                hist.setSolicitacao(s);
                hist.setEstadoAnterior(estadoAnterior);
                hist.setEstadoNovo(s.getEstado());
                hist.setDataHora(LocalDateTime.now());
                hist.setAutor(userLogado);
                historicoAlteracaoRepository.save(hist);
        }

}