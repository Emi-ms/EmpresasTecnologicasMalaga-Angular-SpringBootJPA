import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../../models/empresa";
import {EmpresaService} from "../../../services/empresa.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-list-empresa',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './list-empresa.component.html',
  styleUrl: './list-empresa.component.css'
})
export class ListEmpresaComponent implements OnInit{
  empresas: Empresa[] = [];
  empresasFiltradas: Empresa[] = [];
  filtro: string = '';

  constructor(
    public empresaService: EmpresaService
  ) {
  }

  ngOnInit(): void {
    this.empresaService.getAll().subscribe((data: Empresa[])=>{
      this.empresas = data;
      this.empresasFiltradas = this.empresas;
      console.log(this.empresas);
    })

  }

  deleteEmpresa(id: any){
    this.empresaService.delete(id).subscribe(res => {
      this.empresasFiltradas = this.empresas.filter(emp => emp.idEmpresa !== id);
      console.log('Empresa id =' + id + ' eliminada satisfactoriamente!');
    })
  }

  filtrarEmpresasPorNombre(): void {
    console.log(this.filtro)
    if (this.filtro === '') {
      this.empresasFiltradas = this.empresas;
    } else {
      this.empresasFiltradas = this.empresas.filter(empresa => {
        return empresa.nombre.toLowerCase().includes(this.filtro.toLowerCase());
      });
    }
  }



}
