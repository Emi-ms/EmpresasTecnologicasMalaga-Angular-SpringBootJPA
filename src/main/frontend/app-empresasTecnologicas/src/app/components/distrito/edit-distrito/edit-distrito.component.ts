import {Component, OnInit} from '@angular/core';
import {Distrito} from "../../../models/distrito";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DistritoService} from "../../../services/distrito.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-distrito',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './edit-distrito.component.html',
  styleUrl: './edit-distrito.component.css'
})
export class EditDistritoComponent implements OnInit{
id: number = 0;
distrito: Distrito = {idDistrito: 0, nombre: "VOID"};
form: FormGroup = new FormGroup({
  distrito: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')])
});

constructor(
  public distritoService: DistritoService,
  private route: ActivatedRoute,
  private router: Router
) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idDistrito'];

    this.distritoService.find(this.id).subscribe((data: Distrito) => {
      this.distrito = data;
      console.log(this.distrito);

      this.form.get('nombre')?.setValue(this.distrito.nombre);
    });
    }

    get f() {
      return this.form.controls;
    }

    submit() {
      const updatedDistrito: Distrito = {
        idDistrito: this.distrito.idDistrito,
        nombre: this.form.value.distrito
      };
      console.log(updatedDistrito);

      this.distritoService.update(this.id, updatedDistrito).subscribe(res => {
        console.log('Distrito actualizado satisfactoriamente!');
        this.router.navigateByUrl('distrito').then();
      })
    }



}

