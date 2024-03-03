package org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.repository;

import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.domain.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
}
