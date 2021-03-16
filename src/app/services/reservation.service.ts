import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private myAppUrl = "https://localhost:44348/";
  private myApiUrl = "api/Reservation/";
  constructor(private http: HttpClient) {

  }


  ListAllReservations() : Observable<any>{
   return this.http.get(this.myAppUrl + this.myApiUrl);
  }


  deleteReservations(id:number) : Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl+id);
   }

   saveReservations(reservation:any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl,reservation);
   }


}
