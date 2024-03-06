import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../../models/empresa";
import {EmpresaService} from "../../../services/empresa.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Map, marker, TileLayer} from "leaflet";

@Component({
  selector: 'app-detail-empresa',
  standalone: true,
  imports: [],
  templateUrl: './detail-empresa.component.html',
  styleUrl: './detail-empresa.component.css'
})
export class DetailEmpresaComponent implements OnInit{
  empresa:Empresa |null | undefined;
  empresaId: number = -1
  map: any;
  latitud: number = 0;
  longitud: number = 0;


  constructor(
    public empresaService: EmpresaService,
    public route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.empresaId = Number(this.route.snapshot.params['idEmpresa']);
    console.log(this.empresaId);
    this.empresaService.find(this.empresaId).subscribe((data: Empresa) => {
      this.empresa = data;
      console.log(this.empresa);
      this.latitud = this.empresa.latitud;
      this.longitud = this.empresa.longitud;

    });

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.map = new Map('map').setView([this.latitud, this.longitud], 15);
      const tiles = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,

      }).addTo(this.map);

      marker([this.latitud, this.longitud]).addTo(this.map).bindPopup(`<b style="font-size: 18px">${this.empresa?.nombre}</b> <img src="${this.empresa?.imagen}" width="70" height="50">`).openPopup();

    }, 2000);
  }
}
