package org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.domain.Distrito;
import org.iesbelen.empresastecnologicas.empresastecnologicasmalaga.service.DistritoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/distrito")
public class DistritoController {

    private final DistritoService distritoService;

    public DistritoController(DistritoService distritoService) {
        this.distritoService = distritoService;
    }

    @GetMapping({"","/"})
    public List<Distrito> all() {
        log.info("Accediendo a todos los distritos");
        return this.distritoService.all();
    }
    @PostMapping({"","/"})
    public Distrito newDistrito(@RequestBody Distrito distrito) {
        return this.distritoService.save(distrito);
    }

    @GetMapping("/{id}")
    public Distrito one(@PathVariable("id") Long id) {
        return this.distritoService.one(id);
    }

    @PutMapping("/{id}")
    public Distrito replaceDistrito(@PathVariable("id") Long id, @RequestBody Distrito distrito) {
        return this.distritoService.replace(id, distrito);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteDistrito(@PathVariable("id") Long id) {
        this.distritoService.delete(id);
    }
}
