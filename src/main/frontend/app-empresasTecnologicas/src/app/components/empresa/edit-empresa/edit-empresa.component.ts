import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../../models/empresa";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Distrito} from "../../../models/distrito";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DistritoService} from "../../../services/distrito.service";
import {EmpresaService} from "../../../services/empresa.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-empresa',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-empresa.component.html',
  styleUrl: './edit-empresa.component.css'
})
export class EditEmpresaComponent implements OnInit{

  id: number = 0;
  empresa: Empresa = {idEmpresa: 0, nombre: "VOID", direccion: "VOID", telefono: "VOID", email: "VOID", web: "VOID", descripcion: "VOID", imagen: "VOID", latitud: 0, longitud: 0, distrito: {idDistrito: 0, nombre: "VOID"}};
  distritos:Distrito[] = [];
  idBusqueda: number | undefined;
  distritoBusqueda: Distrito | undefined;



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

  constructor(
    public empresaService: EmpresaService,
    public distritoService: DistritoService,
    private route: ActivatedRoute,
    private router: Router

  ) {
  }

  get f() {
    return this.form.controls;
  }





  ngOnInit(): void {
    this.id = this.route.snapshot.params['idEmpresa'];
    this.distritoService.getAll().subscribe(res => {
      this.distritos = res;
    });
    this.empresaService.find(this.id).subscribe((data: Empresa) => {
      this.empresa = data;
      console.log(this.empresa);

        this.form.get('nombre')?.setValue(this.empresa.nombre);
        this.form.get('direccion')?.setValue(this.empresa.direccion);
        this.form.get('telefono')?.setValue(this.empresa.telefono);
        this.form.get('email')?.setValue(this.empresa.email);
        this.form.get('web')?.setValue(this.empresa.web);
        this.form.get('descripcion')?.setValue(this.empresa.descripcion);
        this.form.get('imagen')?.setValue(this.empresa.imagen);
        this.form.get('latitud')?.setValue(this.empresa.latitud);
        this.form.get('longitud')?.setValue(this.empresa.longitud);
        this.form.get('distrito')?.setValue(this.empresa.distrito.idDistrito);
    });
  }

  submit(){
    console.log(this.form.value);
    this.idBusqueda = this.form.value['distrito'];
    this.distritoService.find(this.idBusqueda as number).subscribe((data: Distrito) => {
      this.distritoBusqueda = data;
      this.form.value['distrito'] = this.distritoBusqueda;

      const updatedEmpresa: Empresa = {
        idEmpresa: this.empresa.idEmpresa,
        nombre: this.form.value.nombre,
        direccion: this.form.value.direccion,
        telefono: this.form.value.telefono,
        email: this.form.value.email,
        web: this.form.value.web,
        descripcion: this.form.value.descripcion,
        imagen: this.form.value.imagen,
        latitud: this.form.value.latitud,
        longitud: this.form.value.longitud,
        distrito: this.form.value.distrito
      };
      console.log(updatedEmpresa);

      this.empresaService.update(this.id, updatedEmpresa).subscribe(res => {
        console.log('Empresa actualizada satisfactoriamente!');
        this.router.navigateByUrl('empresa').then();
      })
    });
  }

}
