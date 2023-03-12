import { Injectable} from '@angular/core';
import { ApolloQueryResult, gql } from "@apollo/client/core";
import { Apollo } from "apollo-angular";
import { Observable } from 'rxjs';

const headers = {
  'x-client-id': '63fdff59ca47b91b2f8f0546',
  'x-app-id': '63fdff59ca47b91b2f8f0548',
};



@Injectable({
  providedIn: 'root'
})
export class ListVehiculeService {

  constructor(private apollo: Apollo) { }

  getListVehicule(): Observable<any>{
    const query = gql`
    query {
      vehicleList(
        page: 0
        size: 20
      ) {
        id
        naming {
          make
          model
        }
        connectors {
          time
        }
        range{
          chargetrip_range {
            best
            worst
          }
        }
        media{
          image{
            thumbnail_url
          }
        }
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query,
      context: {
        headers,
      },
    }).valueChanges;

  }


}
