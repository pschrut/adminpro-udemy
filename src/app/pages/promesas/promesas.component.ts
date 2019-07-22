import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then((msg) => {
      console.log('termino!', msg);
    }).catch((err) => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador++;

        if (contador === 3) {
          resolve();
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
