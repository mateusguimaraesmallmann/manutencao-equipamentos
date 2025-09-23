package com.example.back_end.services;

import com.example.back_end.models.Category;
import com.example.back_end.repositorys.CategoryRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryService {

    private static final Logger log = LoggerFactory.getLogger(CategoryService.class);

    private final CategoryRepository categoryRepository;

    public CategoryService(final CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    @Transactional
    public Category save(Category category) {
        Category saved = categoryRepository.save(category);
        log.debug("Categoria criada: id={}", saved.getId());
        return saved;
    }

    @Transactional
    public Category atualizar(Long id, Category partial) throws NotFoundException {
        Category managed = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());

        copyNonNullProperties(partial, managed, "id");

        Category updated = categoryRepository.save(managed);
        log.debug("Categoria atualizada: id={}", updated.getId());
        return updated;
    }

    @Transactional
    public void excluir(Long id) throws Exception {
        try {
            categoryRepository.deleteById(id);
            log.debug("Categoria excluída: id={}", id);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException();
        } catch (DataIntegrityViolationException e) {
            throw new Exception("Não é possível excluir a categoria pois existem vínculos. id=" + id);
        }
    }

    private static void copyNonNullProperties(Object source, Object target, String... ignoreProperties) {
        BeanWrapper src = new BeanWrapperImpl(source);
        BeanWrapper trg = new BeanWrapperImpl(target);

        Set<String> ignore = new HashSet<>(Set.of(ignoreProperties != null ? ignoreProperties : new String[0]));

        for (var pd : src.getPropertyDescriptors()) {
            String name = pd.getName();
            if ("class".equals(name) || ignore.contains(name)) {
                continue;
            }
            Object val = src.getPropertyValue(name);
            if (val != null && trg.isWritableProperty(name)) {
                trg.setPropertyValue(name, val);
            }
        }
    }
}