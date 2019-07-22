import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-donas',
  templateUrl: './grafico-donas.component.html',
  styles: []
})
export class GraficoDonasComponent implements OnInit {
  @Input() doughnutChartLabels: Label[] = ['Con Frijoles', 'Con Natilla', 'Con tocino'];
  @Input() doughnutChartData: MultiDataSet = [[24, 30, 46]];
  @Input() doughnutChartType: ChartType = 'doughnut';
  @Input() leyenda: string = 'El pan se come con';

  constructor() { }

  ngOnInit() {
  }

}
