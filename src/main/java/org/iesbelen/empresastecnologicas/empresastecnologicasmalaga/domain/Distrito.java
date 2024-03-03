package org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Table(name = "distrito")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Distrito {
    @Id
    @Column(name = "id_distrito")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDistrito;
    private String nombre;

    @OneToMany(mappedBy = "distrito", fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Empresa> empresasDistrito;
}
