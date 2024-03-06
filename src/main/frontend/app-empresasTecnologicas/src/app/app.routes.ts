import { Routes } from '@angular/router';
import {ListadoDistritoComponent} from "./components/distrito/listado-distrito/listado-distrito.component";
import {CreateDistritoComponent} from "./components/distrito/create-distrito/create-distrito.component";
import {EditDistritoComponent} from "./components/distrito/edit-distrito/edit-distrito.component";
import {ListEmpresaComponent} from "./components/empresa/list-empresa/list-empresa.component";
import {CreateEmpresaComponent} from "./components/empresa/create-empresa/create-empresa.component";
import {EditEmpresaComponent} from "./components/empresa/edit-empresa/edit-empresa.component";
import {HomeComponent} from "./components/home/home.component";
import {DetailEmpresaComponent} from "./components/empresa/detail-empresa/detail-empresa.component";

export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'distrito', component: ListadoDistritoComponent},
  {path:'distrito/create', component: CreateDistritoComponent},
  {path:'distrito/edit/:idDistrito', component: EditDistritoComponent},
  {path:'empresa', component: ListEmpresaComponent},
  {path:'empresa/create', component: CreateEmpresaComponent},
  {path:'empresa/edit/:idEmpresa', component: EditEmpresaComponent},
  {path:'empresa/detail/:idEmpresa', component: DetailEmpresaComponent},
];
