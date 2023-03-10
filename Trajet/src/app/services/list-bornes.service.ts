import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloQueryResult, gql } from "@apollo/client/core";
import { Apollo } from "apollo-angular";

const headers = {
  'x-client-id': '63fdff59ca47b91b2f8f0546',
  'x-app-id': '63fdff59ca47b91b2f8f0548',
};


@Injectable({
  providedIn: 'root'
})
export class ListBornesService {

  constructor(private apollo: Apollo) { }

  getListBornes(point : [number, number]): Observable<any>{
    const query = gql`
    query stationAround($query: StationAroundQuery!){
      stationAround(
          query: $query
          size: 1
        ) {
          location {
            type
            coordinates
          }
          power
          speed
          status
          }
      }

    `;
    return this.apollo.watchQuery<any>({
      query : query,
      variables: {
        query: {
          location: {
            type: "Point",
            coordinates: [
              point[0],
              point[1]
            ]
          },
          distance: 10000
        }
      },
      context: {
        headers,
      },
    }).valueChanges;

  }


}

