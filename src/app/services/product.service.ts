import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/product";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class ProductService {
    private currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/products`);
    }

    addProduct(product: Product) {
        return this.http.post(`${environment.apiUrl}/products/addProduct`, product);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/product/${id}`);
    }
}