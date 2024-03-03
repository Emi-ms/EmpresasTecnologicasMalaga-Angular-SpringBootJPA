package org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.service;

import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.domain.Distrito;
import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.exception.DistritoNotFoundException;
import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.repository.DistritoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistritoService {
    private final DistritoRepository distritoRepository;

    public DistritoService(DistritoRepository distritoRepository) {
        this.distritoRepository = distritoRepository;
    }

    public List<Distrito> all() {
        return this.distritoRepository.findAll();
    }

    public Distrito save(Distrito distrito) {
        return this.distritoRepository.save(distrito);
    }

    public Distrito one(Long id) {
        return this.distritoRepository.findById(id)
                .orElseThrow(() -> new DistritoNotFoundException(id));
    }

    public Distrito replace(Long id, Distrito distrito) {
        return this.distritoRepository.findById(id).map(p -> (id.equals(distrito.getIdDistrito()) ?
                        this.distritoRepository.save(distrito) : null))
                .orElseThrow(() -> new DistritoNotFoundException(id));
    }

    public void delete(Long id) {
        this.distritoRepository.findById(id).map(distrito -> {
                    this.distritoRepository.delete(distrito);
                    return distrito;
                })
                .orElseThrow(() -> new DistritoNotFoundException(id));
    }

}
