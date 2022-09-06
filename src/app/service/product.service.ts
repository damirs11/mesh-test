import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Product} from "../api/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api: string;

  constructor(private http: HttpClient, private env: EnvironmentService) {
    this.api = env.getValue("API_URL") + '/product';
  }

  getById(id: string) {
    return this.http.get<Product>(`${this.api}/get/${id}`);
  }

  getAll() {
    return this.http.get<Product[]>(`${this.api}/get`);
  }

  create(product: Product) {
    return this.http.post<Product>(`${this.api}/create`, product);
  }

  edit(product: Product) {
    return this.http.put<Product>(`${this.api}/edit`, product);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.api}/remove`, {params: {id}});
  }
}
