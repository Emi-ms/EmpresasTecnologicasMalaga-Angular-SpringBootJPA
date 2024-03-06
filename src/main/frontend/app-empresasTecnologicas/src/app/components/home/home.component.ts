import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../models/empresa";
import {EmpresaService} from "../../services/empresa.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {DistritoService} from "../../services/distrito.service";
import {Distrito} from "../../models/distrito";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  empresas: Empresa[] = [];
  distritos: Distrito[] = [];
  empresasFiltradas: Empresa[] = [];
  distritoSeleccionado: string = '';

  constructor(
    public empresaService: EmpresaService,
    public distritoService: DistritoService,
  ) {
  }

  ngOnInit(): void {
    this.empresaService.getAll().subscribe(res => {
      this.empresas = res;
      this.empresasFiltradas = this.empresas;
      console.log(this.empresas);
    })

    this.distritoService.getAll().subscribe(res => {
      this.distritos = res;
      console.log(this.distritos);
    });


  }
  filtrarEmpresasPorDistrito(): void {
    if (this.distritoSeleccionado === '') {
      this.empresasFiltradas = this.empresas;
    } else {
      this.empresasFiltradas = this.empresas.filter(empresa =>{
        console.log(empresa.distrito.nombre);
        console.log(this.distritoSeleccionado);

        return empresa.distrito.nombre === this.distritoSeleccionado
      });
    }
  }
}
