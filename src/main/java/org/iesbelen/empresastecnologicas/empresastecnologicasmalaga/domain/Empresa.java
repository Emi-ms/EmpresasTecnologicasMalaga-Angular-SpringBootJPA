package org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="empresa")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_empresa")
    private long idEmpresa;
    private String nombre;
    private String direccion;
    private String telefono;
    private String email;
    private String web;
    @Column(length = 500)
    private String descripcion;
    private String imagen;
    private double latitud;
    private double longitud;
    @ManyToOne()
    @JoinColumn(name = "id_distrito", nullable = false, foreignKey = @ForeignKey(name = "FK_EMPRESA_DISTRITO"))
    private Distrito distrito;


}
