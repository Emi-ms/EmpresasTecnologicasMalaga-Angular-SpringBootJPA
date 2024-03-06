import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../models/empresa";
import {EmpresaService} from "../../services/empresa.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  empresas: Empresa[] = [];

  constructor(
    public empresaService: EmpresaService,
  ) {
  }

  ngOnInit(): void {
    this.empresaService.getAll().subscribe(res => {
      this.empresas = res;
      console.log(this.empresas);
    })


  }

}
