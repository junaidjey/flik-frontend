import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
    getProfilePic(): Observable<string[]>{
         return this.http.get<any>(`${environment.apiUrl}/api/user/get-image`);
    }

    // getProfilePic(){
    //     return this.http.get(`${environment.apiUrl}/api/user/get-image`);
    // }
}