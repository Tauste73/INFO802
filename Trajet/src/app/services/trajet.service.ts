import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  constructor(private http: HttpClient) { }

  getTrajet(point1x: number, point1y: number, point2x: number, point2y: number): Observable<any>{
    console.log(point1x, point1y, point2x, point2y)

    return this.http.get('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62487cdfd1062219474eb734d34bfd7f0c65&start='+point1x+','+point1y+'&end='+point2x+','+point2y)
  }

  getFinalTrajet(tabCoordonnées : any ): Observable<any>{

    //var jsonObject = {"coordinates":[['4.08524000', '48.30073000'],['5.92079000', '45.56628000'], ['4.8945416', '45.88434739'],['5.17472978', '47.51473778']]}
    var jsonObject = {"coordinates":tabCoordonnées}
    console.log(jsonObject.coordinates)


    return this.http.post('https://api.openrouteservice.org/v2/directions/driving-car/geojson' , jsonObject, {headers: new HttpHeaders({
      'Authorization': '5b3ce3597851110001cf62487cdfd1062219474eb734d34bfd7f0c65'
  })
    })
  }

}
