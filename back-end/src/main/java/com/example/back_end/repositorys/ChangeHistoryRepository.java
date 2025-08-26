package com.example.back_end.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.models.ChangeHistory;

public interface ChangeHistoryRepository extends JpaRepository<ChangeHistory, Long> {
    
}
