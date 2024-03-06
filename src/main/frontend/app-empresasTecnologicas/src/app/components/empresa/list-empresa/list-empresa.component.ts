import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../../models/empresa";
import {EmpresaService} from "../../../services/empresa.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-empresa',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './list-empresa.component.html',
  styleUrl: './list-empresa.component.css'
})
export class ListEmpresaComponent implements OnInit{
  empresas: Empresa[] = [];

  constructor(
    public empresaService: EmpresaService
  ) {
  }

  ngOnInit(): void {
    this.empresaService.getAll().subscribe((data: Empresa[])=>{
      this.empresas = data;
      console.log(this.empresas);
    })
  }

  deleteEmpresa(id: any){
    this.empresaService.delete(id).subscribe(res => {
      this.empresas = this.empresas.filter(emp => emp.idEmpresa !== id);
      console.log('Empresa id =' + id + ' eliminada satisfactoriamente!');
    })
  }




}
