import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.domain.Distrito;
import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.domain.Empresa;
import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.repository.DistritoRepository;
import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.service.DistritoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class DistritoServiceTest {


    @InjectMocks
    DistritoService distritoService;

    @Mock
    DistritoRepository distritoRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void all() {
        Distrito distrito1 = new Distrito();
        Distrito distrito2 = new Distrito();
        when(distritoRepository.findAll()).thenReturn(Arrays.asList(distrito1, distrito2));

        List<Distrito> result = distritoService.all();

        assertEquals(2, result.size());
        verify(distritoRepository, times(1)).findAll();
    }

    @Test
    void save() {
        Distrito distrito = new Distrito();
        when(distritoRepository.save(any(Distrito.class))).thenReturn(distrito);

        Distrito result = distritoService.save(distrito);

        assertEquals(distrito, result);
        verify(distritoRepository, times(1)).save(distrito);
    }

    @Test
    void one() {
        Distrito distrito = new Distrito(1, "Distrito 1", new ArrayList<>() {
        });
        when(distritoRepository.findById(anyLong())).thenReturn(Optional.of(distrito));

        Distrito result = distritoService.one((long) 1);

        assertEquals(distrito, result);
        System.out.println("Distrito: " + result.toString());
        verify(distritoRepository, times(1)).findById(1L);
    }


}

