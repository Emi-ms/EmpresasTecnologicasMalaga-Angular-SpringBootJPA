import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../models/empresa";
import {EmpresaService} from "../../services/empresa.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {DistritoService} from "../../services/distrito.service";
import {Distrito} from "../../models/distrito";
import {FormsModule} from "@angular/forms";
import L, {Map, Marker, marker, TileLayer} from "leaflet";
import {getLocation} from "@angular/localize/tools/src/source_file_utils";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  empresas: Empresa[] = [];
  distritos: Distrito[] = [];
  empresasFiltradas: Empresa[] = [];
  distritoSeleccionado: string = '';
  map: any;
  userLocation: any;

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

    this.map = new Map('my-map').setView([36.71523369179694, -4.434779357899467], 10);
    const tiles = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      minZoom:12
    }).addTo(this.map);

  }

  ngAfterViewInit() {
    setTimeout(() => {
      for (let empresa of this.empresas) {
        L.marker([empresa.latitud, empresa.longitud])
          .addTo(this.map)
          .bindPopup(`<b style="font-size: 18px">${empresa.nombre}</b> <img src="${empresa.imagen}" width="70" height="50" alt="logo-empresa"><br><a href="/empresa/detail/${empresa.idEmpresa}" routerLink="/empresa/detail/${empresa.idEmpresa}" style="text-decoration: none">Ver detalles</a>`);
      }
    }, 2000);
  }

  filtrarEmpresasPorDistrito(): void {
    if (this.distritoSeleccionado === '') {
      this.empresasFiltradas = this.empresas;
    } else {
      this.empresasFiltradas = this.empresas.filter(empresa => {
        return empresa.distrito.nombre === this.distritoSeleccionado
      });
    }
  }

  async getLocation() {

    if (navigator.geolocation) {
      this.userLocation = await this.getCoordenate();
      console.log(this.userLocation);
      let greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.marker(this.userLocation,{icon:greenIcon}).addTo(this.map).bindPopup(`<h5>Usted se encuentra aquí</h5>`).openPopup();
    }
  }

  getCoordenate() {
    return new Promise((res, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
          res([position.coords.latitude, position.coords.longitude])
        },
        (_) => {
          reject([1.152639, -1.711598]);
        }
      )
    })
  }
}
