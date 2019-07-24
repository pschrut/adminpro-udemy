import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  cargando: boolean = true;
  hospitales: Hospital[] = [];
  totalHospitales: number;

  constructor(public hospitalService: HospitalService) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.getHospitales().subscribe((resp: any) => {
      this.cargando = false;
      this.hospitales = resp.data;
      console.log(this.hospitales);
      this.totalHospitales = resp.total;
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Eliminar el hospital ' + hospital.nombre + '?',
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
      this.hospitalService.borrarHospital(hospital._id).subscribe((resp: any) => {
        this.cargarHospitales();
      });
    });
  }

  buscarHospital(value: string) {

  }

  crearHospital() {
    Swal.fire({
      title: 'Nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    }).then((data) => {
      if (data.value) {
        this.hospitalService.crearHospital(data.value).subscribe((resp: any) => {
          this.cargarHospitales();
        });
      }
    });
  }

}
