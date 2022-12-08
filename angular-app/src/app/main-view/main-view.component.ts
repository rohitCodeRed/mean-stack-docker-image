import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit{

  chartIcons = [
    { parentName:"Line Chart",childName:[
                              {name:"Dynamic Chart",link:"dynamicLine",imgSrc:"dynamic-update.png"},
                              ]
                          },
    
     { parentName:"Gauges",childName:[
                                {name:"Solid Gauge",link:"solidGauge",imgSrc:"gauge-solid.png"},
                               ]
                            }
];
constructor() { }

ngOnInit() {
}


}
