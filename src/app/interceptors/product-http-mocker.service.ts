import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {EnvironmentService} from "../service/environment.service";
import {Product} from "../api/Product";




@Injectable({
  providedIn: 'root'
})
export class ProductHttpMockerService implements HttpInterceptor {
  api: string;

  productData: Product[] = [
    {id: "1", name: "product - 1", description: "description - 1", price: 100},
    {id: "2", name: "product - 2", description: "description - 2", price: 200},
    {id: "3", name: "product - 3", description: "description - 3", price: 300},
    {id: "4", name: "product - 4", description: "description - 4", price: 400},
    {id: "5", name: "product - 5", description: "description - 5", price: 500},
    {id: "6", name: "product - 6", description: "description - 6", price: 606},
  ]

  constructor(private env: EnvironmentService) {
    this.api = this.env.getValue("API_URL") + '/product';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(this.api)) {
      const urls = req.url.split("/");

      if (urls[urls.length - 1].includes("get")) {
        return of(new HttpResponse({ status: 200, body: this.productData }));
      }

      if (urls[urls.length - 1].includes("remove")) {
        this.productData = this.productData.filter(p => p.id !== req.params.get("id"))
        return of(new HttpResponse({ status: 200}));
      }

      if (urls[urls.length - 1].includes("edit")) {
        this.productData = this.productData.map(p => {
          if (p.id === req.body.id) {
            return req.body;
          }
          return p;
        });
        return of(new HttpResponse({ status: 200}));
      }

      if (urls[urls.length - 1].includes("create")) {
        this.productData = [...this.productData, req.body];
        return of(new HttpResponse({ status: 200}));
      }
    }
    return next.handle(req);
  }


}
