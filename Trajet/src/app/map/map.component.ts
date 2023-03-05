import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { TrajetService } from '../services/trajet.service';
import { Cities} from 'countries-states-cities-service'
import { ListBornesService } from '../services/list-bornes.service';

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




  constructor(private trajet : TrajetService, private listBornes: ListBornesService) { }

  ngAfterViewInit(): void {
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

    var greenIcon = L.icon({
      iconUrl: '../assets/leaf-green.png',
      shadowUrl: '../assets/leaf-shadow.png',

      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  this.map.on('click', (e: any) => {
    console.log(e.latlng);


    this.nbPoint++;
    if(this.nbPoint == 2){
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map).addTo(this.lgMarkers);
      this.point2 = [e.latlng.lng, e.latlng.lat];
      this.nbPoint = 0;
      this.trajet.getTrajet(this.point1[0], this.point1[1], this.point2[0], this.point2[1]).subscribe(
        (data) => {
          console.log(data);
          L.geoJSON(data).addTo(this.map).addTo(this.lgMarkers);
          console.log("OUAI");
        })
    } else{
      this.lgMarkers.clearLayers();
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map).addTo(this.lgMarkers);
      this.point1 = [e.latlng.lng, e.latlng.lat];
    }

  })

  }

  onAfficheTrajet(){
    this.lgMarkers.clearLayers();
    var allCity = Cities.getCities();
    allCity.find((city) => {
      if(city.name == this.ville1){
        console.log(city.name, city.latitude, city.longitude)
        this.point1 = [city.longitude, city.latitude]
        L.marker([Number(city.latitude), Number(city.longitude)]).addTo(this.map).addTo(this.lgMarkers);
        this.map.setView([Number(city.latitude), Number(city.longitude)], 10);
      }
      if(city.name == this.ville2){
        console.log(city.name, city.latitude, city.longitude)
        this.point2 = [city.longitude, city.latitude]
        L.marker([Number(city.latitude), Number(city.longitude)]).addTo(this.map).addTo(this.lgMarkers);
      }
    }
    )
    this.trajet.getTrajet(this.point1[0], this.point1[1], this.point2[0], this.point2[1]).subscribe(
      (data) => {
        console.log(data);
        L.geoJSON(data).addTo(this.map).addTo(this.lgMarkers);
      })

    this.listBornes.getListBornes().subscribe(
        (data) => {
          console.log(data);
        }
    )

  }
}
