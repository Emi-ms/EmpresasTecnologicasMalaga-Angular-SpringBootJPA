import {Distrito} from "./distrito";

export interface Empresa{
  idEmpresa: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  web: string;
  descripcion: string;
  imagen: string;
  latitud: number;
  longitud: number;
  distrito: Distrito;
}



