import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListBornesService {

  constructor(private http: HttpClient) { }

  getListBornes(): Observable<any>{
    return this.http.get("https://odre.opendatasoft.com/api/records/1.0/search/?dataset=bornes-irve&q=&sort=n_amenageur&facet=region&facet=departement")

  }




}
