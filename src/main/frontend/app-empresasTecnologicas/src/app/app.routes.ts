import { Routes } from '@angular/router';
import {ListadoDistritoComponent} from "./components/distrito/listado-distrito/listado-distrito.component";
import {CreateDistritoComponent} from "./components/distrito/create-distrito/create-distrito.component";
import {EditDistritoComponent} from "./components/distrito/edit-distrito/edit-distrito.component";

export const routes: Routes = [
  {path:'distrito', component: ListadoDistritoComponent},
  {path:'distrito/create', component: CreateDistritoComponent},
  {path:'distrito/edit/:idDistrito', component: EditDistritoComponent}
];
