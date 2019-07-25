import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medicos';

    return this.http.get(url).pipe(map((resp: any) => {
      this.totalMedicos = resp.total;
      return resp.data;
    }));
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medicos/' + id;

    return this.http.get(url).pipe(map((resp: any) => {
      return resp.medico;
    }));
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      console.log(resp);
      return resp.medicos;
    }));
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIOS + '/medicos/' + id + '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe(map((resp: any) => {
      Swal.fire('Medico borrado', 'Médico borrado correctamente', 'success');

      return resp;
    }));
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medicos';

    if (medico._id) {
      url += '/' + medico._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, medico).pipe(map((resp: any) => {
        Swal.fire('Medico actualizado ', medico.nombre, 'success');
        return resp.data;
      }));
    } else {
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, medico).pipe(map((resp: any) => {
        Swal.fire('Medico creado ', medico.nombre, 'success');
        return resp.data;
      }));
    }
  }
}
