import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DistritoService} from "../../../services/distrito.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-create-distrito',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './create-distrito.component.html',
  styleUrl: './create-distrito.component.css'
})
export class CreateDistritoComponent implements OnInit{
  form: FormGroup =  new FormGroup({
    nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ])
  });

  constructor(
    public distritoService:DistritoService,
    private router: Router
  ) {
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.distritoService.create(this.form.value).subscribe(res => {
      console.log('Distrito creado correctamente!' + res.nombre);
      this.router.navigateByUrl('distrito').then();
    })
  }

  ngOnInit(): void {
  }

}
