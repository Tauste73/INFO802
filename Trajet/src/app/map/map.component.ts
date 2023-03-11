import { Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { TrajetService } from '../services/trajet.service';
import { Cities} from 'countries-states-cities-service'
import { ListBornesService } from '../services/list-bornes.service';
import { ListVehiculeService } from '../services/list-vehicule.service';
import { TempsTrajetService } from '../services/temps-trajet.service';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface DialogData {
  Marque: string;
  Model: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  point1 :any = [];
  nbPoint = 0;
  point2 :any = [];
  ville1! : string
  ville2! : string
  private map : any;
  lgMarkers = new L.LayerGroup();
  mylistVehicule: any = [];
  autonomieVehicule!: number;
  distance! : number;
  vitesseMoy : number = 130;
  tempsRecharge! : number;
  tempsTrajet!: number;
  tempsTrajetHeures!: number;
  nbRecharge! : number;

  borneIcon = L.icon({
    iconUrl: '../assets/borne.png',
    iconSize:     [38, 65], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


  constructor(private trajet : TrajetService, private listBornes: ListBornesService,  private listVehicule: ListVehiculeService, private tempsTrajetService: TempsTrajetService, public snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {

    this.listVehicule.getListVehicule().subscribe(
      (data) => {
        console.log(data.data.vehicleList);
        this.mylistVehicule = data.data.vehicleList
      });

    this.map = L.map('map', {
      center: [ 45.764043, 4.835659 ],
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);


    this.map.addLayer(this.lgMarkers);



  }

  onAfficheTrajet(){
    this.lgMarkers.clearLayers();
    var allCity = Cities.getCities();
    //On récupère les coordonnées des villes
    allCity.find((city) => {
      if(city.name == this.ville1){
        this.point1 = [city.longitude, city.latitude]
        L.marker([Number(city.latitude), Number(city.longitude)]).addTo(this.map).addTo(this.lgMarkers);
        this.map.setView([Number(city.latitude), Number(city.longitude)], 10);
      }
      if(city.name == this.ville2){
        this.point2 = [city.longitude, city.latitude]
        L.marker([Number(city.latitude), Number(city.longitude)]).addTo(this.map).addTo(this.lgMarkers);
      }
    }
    )
    //On récupère un premier trajet et on le découpe en plusieurs point en fonction de l'autonomie du véhicule
    this.trajet.getTrajet(this.point1[0], this.point1[1], this.point2[0], this.point2[1]).subscribe(
      (data) => {

        let points = data.features[0].geometry.coordinates;
        let distances = data.features[0].properties.segments[0].steps;
        let distance = 0;
        let listPointSegment = [];
        let distmax = this.autonomieVehicule*1000;
        this.distance = data.features[0].properties.summary.distance / 1000;
        console.log("Disctance " +this.distance);

        for (let i = 0; i < distances.length; i++) {
          distance += distances[i].distance;
          if (distance > distmax) {
            listPointSegment.push(points[distances[Math.max(i-1,0)].way_points[1]]);
            distance =distances[i].distance;
          }
        }
        this.nbRecharge = listPointSegment.length;
        console.log("Nb de recharge : " + this.nbRecharge);
        this.recupListBornes(listPointSegment);



      })
  }


  selectVehicule(vehicule : any): void{
    this.autonomieVehicule = vehicule.range.chargetrip_range.best;
    this.tempsRecharge = vehicule.connectors[0].time;
    console.log(this.tempsRecharge);
    console.log(this.autonomieVehicule);
    this.snackBar.open("Véhicule choisi : "+ vehicule.naming.model, "action", {
      duration: 4000,

    });
  }

  //Récupère la liste de bornes à proximité des points
  recupListBornes(pList: any){
    let listPoint: any = [];
    listPoint.push(this.point1);
        if(pList.length > 0){
        pList.forEach((point: any) => {
          this.listBornes.getListBornes(point).subscribe(
            (data) => {
              data.data.stationAround.forEach((station: any) => {
                L.marker([station.location.coordinates[1], station.location.coordinates[0]], {icon: this.borneIcon}).addTo(this.map).addTo(this.lgMarkers);

                point  = [station.location.coordinates[0].toString(), station.location.coordinates[1].toString()];
                listPoint.push(point);
              }
              )
              this.trajetFinal(listPoint);

            }
          )
        })
      }
      else{
        this.trajetFinal(listPoint);
      }

      }


  //Récupère et affiche le trajet final en passant par toutes les bornes
  trajetFinal(listPoint: any){

    listPoint.push(this.point2);
    console.log(listPoint);
    this.trajet.getFinalTrajet(listPoint).subscribe(
      (data) => {
        console.log(data);
        L.geoJSON(data).addTo(this.map).addTo(this.lgMarkers);
        this.onCalculeTemps();

          }
        )
    }


    onCalculeTemps(){
      this.tempsTrajetService.getTempsTrajet(this.distance, this.vitesseMoy, this.tempsRecharge, this.nbRecharge).subscribe(
        (data) => {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(data, "text/xml");
          var tempsTrajet = xmlDoc.querySelectorAll("tempstrajetResult").forEach((item) => {
            console.log(item.textContent);
            this.tempsTrajet = Number(item.textContent);
          });

          this.tempsTrajetService.convertMinutesToHours(Number(this.tempsTrajet)).subscribe(
            (data) => {
              console.log(data);
              this.tempsTrajetHeures = data.hours;
            }
          )


        }
      )
    }



}

