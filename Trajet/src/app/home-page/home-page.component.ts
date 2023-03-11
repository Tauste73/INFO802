import { Component, OnInit } from '@angular/core';
import { ListBornesService } from '../services/list-bornes.service';
import { ListVehiculeService } from '../services/list-vehicule.service';
import { TempsTrajetService } from '../services/temps-trajet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{




  constructor() {   }






  ngOnInit(): void {
    /*this.listVehicule.getListVehicule().subscribe(
      (data) => {
        console.log(data.data.vehicleList);
        this.mylistVehicule = data.data.vehicleList
      })*/


  }

}
