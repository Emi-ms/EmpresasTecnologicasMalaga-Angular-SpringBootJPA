import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmpresaService} from "../../../services/empresa.service";
import {DistritoService} from "../../../services/distrito.service";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {Distrito} from "../../../models/distrito";

@Component({
  selector: 'app-create-empresa',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './create-empresa.component.html',
  styleUrl: './create-empresa.component.css'
})
export class CreateEmpresaComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'),Validators.maxLength(255)]),
    direccion: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9ÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ/., \-\']+'),Validators.maxLength(255)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.maxLength(255)]),
    web: new FormControl('', [Validators.required, Validators.pattern('^(http|https)://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.maxLength(255)]),
    descripcion: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9ÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ., \-\']+'), Validators.maxLength(500)]),
    imagen: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    latitud: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]{1,3}(\\.[0-9]{1,6})?$')]),
    longitud: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]{1,3}(\\.[0-9]{1,6})?$')]),
    distrito: new FormControl('', [Validators.required])

  });

  distritos: Distrito[] = [];
  idBusqueda: number | undefined;
  distritoBusqueda: Distrito | undefined;

  constructor(
    public empresaService: EmpresaService,
    public distritoService: DistritoService,
    public router: Router
  ) {
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.idBusqueda = this.form.value['distrito'];
    this.distritoService.find(this.idBusqueda as number).subscribe((data: Distrito) => {
      this.distritoBusqueda = data;
      this.form.value['distrito'] = this.distritoBusqueda;

      this.empresaService.create(this.form.value).subscribe(res => {
        console.log('Empresa creada correctamente!' + res.nombre);
        this.router.navigateByUrl('empresa').then();
      })
    });
  }

  ngOnInit(): void {
    this.distritoService.getAll().subscribe((data: Distrito[]) => {
      this.distritos = data;
      // console.log(this.distritos);
    });
  }
}
