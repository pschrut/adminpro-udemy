import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];

  constructor(public medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.cargarMedicos().subscribe(((resp: any) => {
      this.medicos = resp;
    }));
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedicos(termino).subscribe((resp: any) => {
      this.medicos = resp;
    });
  }

  borrarMedico(medico: Medico) {
    this.medicoService.borrarMedico(medico._id).subscribe(() => this.cargarMedicos());
  }
}
