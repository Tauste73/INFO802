import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempsTrajetService {

httpOptions = {
    headers: new HttpHeaders({
      'Accept': '*/*',
    }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) { }

  getTempsTrajet(distance: number, vitesseMoy: number, tempsRechargeMinutes: number, nbRecharge: number): Observable<any>{

    var request : String = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:spy="spyne.examples.tempstrajet.soap">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <spy:tempstrajet>\
          <spy:distance>'+distance+'</spy:distance>\
          <spy:vitessemoy>'+vitesseMoy+'</spy:vitessemoy>\
          <spy:tempsRechargeMinutes>'+tempsRechargeMinutes+'</spy:tempsRechargeMinutes>\
          <spy:nbRecharge>'+nbRecharge+'</spy:nbRecharge>\
       </spy:tempstrajet>\
    </soapenv:Body>\
 </soapenv:Envelope>';



    return this.http.post('https://info-802-soap.vercel.app/?wsdl', request, this.httpOptions)
  }

  convertMinutesToHours(minutes: number): Observable<any>{

    var jsonObject = {minute : minutes}

    return this.http.post('https://info-802-nodejs.vercel.app/convertmtoh', jsonObject)
  }


}
