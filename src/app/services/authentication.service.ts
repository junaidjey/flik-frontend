import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    // private headers = new Headers({
    //     'Content-Type': 'application/json'
    //     });
    constructor(private http: HttpClient, public router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        if(this.currentUserSubject.value==null && this.router.url!='/register' && this.router.url!='/registerstep2'){
            this.router.navigate(['/login']);
        }
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signin`, {email: email, password: password})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    registration(user){
        return this.http.post<any>(`${environment.apiUrl}/api/auth/signup`, user)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes         
            return user;
        }));
    }
}