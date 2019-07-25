import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  cargando: boolean = true;
  hospitales: Hospital[] = [];
  totalHospitales: number;

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe((resp: any) => {
      this.cargarHospitales();
    });
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id);
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

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this.hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
      console.log(hospitales);
      this.hospitales = hospitales;
      this.cargando = false;
    });
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
