import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public medicoService: MedicoService,
              public hospitalService: HospitalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService) {
    activatedRoute.params.subscribe(params => {
      const id = params.id;

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.getHospitales().subscribe((hospitales: any) => {
      return this.hospitales = hospitales.data;
    });
    this.modalUploadService.notificacion.subscribe((resp: any) => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe((resp: any) => {
      this.medico = resp;
      this.medico.hospital = resp.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico).subscribe(((medico: any) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    }));
  }

  cambioHospital(id: string) {
    this.hospitalService.obtenerHospital(id).subscribe((resp: any) => {
      this.hospital = resp.hospital;
    });
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
