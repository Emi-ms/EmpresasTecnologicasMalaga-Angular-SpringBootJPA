import {Component, OnInit} from '@angular/core';
import {Distrito} from "../../../models/distrito";
import {DistritoService} from "../../../services/distrito.service";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-listado-distrito',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './listado-distrito.component.html',
  styleUrl: './listado-distrito.component.css'
})
export class ListadoDistritoComponent implements OnInit{
  distritos:Distrito[] = [];

  constructor(public distritoService:DistritoService) {
  }
  ngOnInit(): void {
    this.distritoService.getAll().subscribe((data: Distrito[])=>{
      this.distritos= data;
      console.log(this.distritos);
    })
  }

  deleteDistrito(id: any){
    this.distritoService.delete(id).subscribe(res => {
      this.distritos = this.distritos.filter(dis => dis.idDistrito !== id);
      console.log('Distrito id =' + id + ' eliminada satisfactoriamente!');
    })
  }

}
