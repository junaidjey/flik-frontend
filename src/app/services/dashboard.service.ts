import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChartDto } from '../models/chartDto';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private heroData = {}
  private data = JSON.stringify(this.heroData);
  private currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.currentUserSubject.token
    }),
    observe: 'response' as 'body'
  };
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getAll() {
    return this.http.get<ChartDto[]>(`${environment.apiUrl}/users/getChart`);
  }

  // abc() {
  //   return this.http.post<any>(`${environment.apiUrl}/products/getChart`, this.data, this.httpOptions).pipe(map(user => {
  //     return user.body;
  //   }));
  // }
  ItemsArray = [];
  // topSellingProducts() {
  //   return this.http.post<any>(`${environment.apiUrl}/products/topSellingProducts`, this.data, this.httpOptions).pipe(map(user => {
  //     this.ItemsArray = user.body;
  //     return user.body;
  //   }));
  // }

  topSellingProducts(page, size) {
    return this.http.get<any>(`${environment.apiUrl}/api/movies?page=`+page+'&size='+size).pipe(map(user => {
      this.ItemsArray = user;
      return user;
    }));
  }
  ItemsArrays = [];
  menu() {
    return this.http.post<any>(`${environment.apiUrl}/products/menu`, this.data, this.httpOptions).pipe(map(user => {
      this.ItemsArrays = user.body;
      return user.body;
    }));
  }

  myProfile(){
    return this.http.get<any>(`${environment.apiUrl}/api/user/me`).pipe(map(user => {
      return user;
    }));
  }
}
