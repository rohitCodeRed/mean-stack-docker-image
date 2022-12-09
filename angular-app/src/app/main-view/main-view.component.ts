import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit{

  public chartIcons = [
    { parentName:"Line Chart",name:"Dynamic Chart",link:"linechart",imgSrc:"dynamic-update.png"},
     { parentName:"Gauge Chart",name:"Solid Gauge",link:"gauge",imgSrc:"gauge-solid.png"}
];
constructor() { }

ngOnInit() {
}


}
