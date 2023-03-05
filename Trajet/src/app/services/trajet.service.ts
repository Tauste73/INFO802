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


}
