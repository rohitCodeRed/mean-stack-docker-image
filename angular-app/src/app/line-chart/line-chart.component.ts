import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
//import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit{
  public height="90vh";
  public width="100vw";

  //@Input() chartSize = {"height":"","width":""};

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public lineChartLegend = true;
  public inData={"datasets":[],"labels":[]};
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ["1"],
    datasets: [{
      "data":[2],
      "label":"Random Value",
      "fill":true,
      "tension":0.4,
      "borderWidth":1,
      "pointRadius":1
    }]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
          display: true,
          position:'bottom',
          labels: {
              boxHeight:1
          }
      }
    }
  };

  // ngOnChanges(changes: SimpleChanges) {
  //   // changes.prop contains the old and the new value...
  //   console.log(changes["chartSize"]["currentValue"]["height"]);
  // //   this.height= changes["chartSize"]["currentValue"]["height"];
  // //    this.width= changes["chartSize"]["currentValue"]["width"];
  //  }

  ngOnInit(): void {
    //this.inData = this.generateData(result.data,X_AXIS);
    let ref = this;
    setInterval(function(){
      let time = new Date();
      let tStr=`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      let randNum = Math.floor(Math.random() * 100);;
      ref.updateChart(randNum,tStr);
    },3000);
         
  }

  generateData(data:any,labelKey:any){
    let chartData = {
      labels:[],
      datasets:[]
    }
    return chartData;
  }

  updateChart(value:number,label:any){
    
    this.chart?.chart?.data.labels?.push(label);
    this.chart?.chart?.data.datasets[0]["data"].push(value);
    this.chart?.chart?.update();
  }

}
