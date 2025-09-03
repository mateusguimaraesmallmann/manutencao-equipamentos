package com.example.back_end.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back_end.dtos.ClientDTO;
import com.example.back_end.dtos.EmployeeCreateDTO;
import com.example.back_end.dtos.EmployeeDTO;
import com.example.back_end.dtos.RegisterDTO;
import com.example.back_end.enums.Tipo;
import com.example.back_end.models.Employee;
import com.example.back_end.repositorys.ClientRepository;
import com.example.back_end.repositorys.EmployeeRepository;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository; 
    
    public ClientDTO register(RegisterDTO dto) {

        return new ClientDTO();
    }
    
}