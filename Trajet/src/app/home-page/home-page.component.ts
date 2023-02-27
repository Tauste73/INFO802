import { Component } from '@angular/core';
import { TempsTrajetService } from '../services/temps-trajet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  distance : number = 4;
  vitesseMoy : number = 2;
  tempsRecharge : number = 1;
  tempsTrajet!: number;

  constructor(private tempsTrajetService: TempsTrajetService) { }



  onCalculeTemps(){
    this.tempsTrajetService.getTempsTrajet(this.distance, this.vitesseMoy, this.tempsRecharge).subscribe(
      (data) => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, "text/xml");
        var tempsTrajet = xmlDoc.querySelectorAll("tempstrajetResult").forEach((item) => {
          console.log(item.textContent);
          this.tempsTrajet = Number(item.textContent);
        });
      }
    )
  }

}
