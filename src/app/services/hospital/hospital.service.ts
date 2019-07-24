import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  token: string;

  constructor(public http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
  }

  getHospitales() {
    const url = URL_SERVICIOS + '/hospitales';

    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospitales/' + id;

    return this.http.get(url);
  }

  borrarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospitales/' + id + '?token=' + this.token;

    return this.http.delete(url).pipe(map((resp: any) => {
      Swal.fire('Hospital eliminado', resp.nombre, 'success');
    }));
  }

  crearHospital(nombre: string) {
    const hospital = new Hospital(nombre);

    const url = URL_SERVICIOS + '/hospitales?token=' + this.token;

    return this.http.post(url, hospital).pipe(map((resp: any) => {
      Swal.fire('Hospital creado', nombre, 'success');

      return true;
    }));
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url);
  }

  actualizarHospital(hospital: Hospital) {
    const id = hospital._id;

    const url = URL_SERVICIOS + '/hospitales/' + id + '?token=' + this.token;

    return this.http.put(url, hospital).pipe(map((data: any) => {
      Swal.fire('Hospital actualizado', hospital.nombre, 'success');
    }));
  }
}
