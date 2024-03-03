package org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.service;

import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.domain.Empresa;
import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.exception.EmpresaNotFoundException;
import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.repository.EmpresaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaService {
    private final EmpresaRepository empresaRepository;

    public EmpresaService(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    public List<Empresa> all() {
        return this.empresaRepository.findAll();
    }

    public Empresa save(Empresa empresa) {
        return this.empresaRepository.save(empresa);
    }

    public Empresa one(Long id) {
        return this.empresaRepository.findById(id)
                .orElseThrow(() -> new EmpresaNotFoundException(id));
    }

    public Empresa replace(Long id, Empresa empresa) {
        return this.empresaRepository.findById(id).map(p -> (id.equals(empresa.getIdEmpresa()) ?
                        this.empresaRepository.save(empresa) : null))
                .orElseThrow(() -> new EmpresaNotFoundException(id));
    }

    public void delete(Long id) {
        this.empresaRepository.findById(id).map(empresa -> {
                    this.empresaRepository.delete(empresa);
                    return empresa;
                })
                .orElseThrow(() -> new EmpresaNotFoundException(id));
    }



}
