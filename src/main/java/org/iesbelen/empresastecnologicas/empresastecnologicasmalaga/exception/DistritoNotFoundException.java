package org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.exception;

public class DistritoNotFoundException extends RuntimeException{

            public DistritoNotFoundException(Long id) {
                super("Not found Distrito with id: " + id);
            }
}
