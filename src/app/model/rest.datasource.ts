import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, delay } from "rxjs/operators";
import { Product } from "./product.model";

export const REST_URL = new InjectionToken("rest_url");
@Injectable()
export class RestDataSource {

    constructor(private http: HttpClient, @Inject(REST_URL) private url: string) { }

    /*All this works with the json-server, but the book decided to consolidate (join) the logic of all these methods in one method (sendRequest) for some silly reason.  I don't think that's necessary, it's just more lines of code, but whatever.  I gives me an opportunity to see generics in action.*/
    /*
    getData(): Observable<Product[]> {
        return this.http.get<Product[]>(this.url);
    }

    saveProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.url, product);
    }
    
    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.url}/${product.id}`, product);
    }
    
    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(`${this.url}/${id}`);
    }*/

    getData(): Observable<Product[]> {
        return this.sendRequest<Product[]>("GET", this.url);
    }

    saveProduct(product: Product): Observable<Product> {
        return this.sendRequest<Product>("POST", this.url, product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.sendRequest<Product>("PUT",
            `${this.url}/${product.id}`, product);
    }

    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest<Product>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: Product): Observable<T> {
        /*The {body: body} object below can have other keys, such as headers, withCredentials, and responseType.  To understand these (kinda), look on page 607, 611, 612 of the Pro angular 6 book.  The catchError method will only be invoked if there's a network error.  Here, the error is being transformed before it's thrown, but once it's thrown, it's still not handled.  Usually the method that calls sendRequest or another caller method higher in the hierarchy handles the thrown error.*/

        let myHeaders = new HttpHeaders();
        myHeaders = myHeaders.set("Access-Key", "<secret>");
        myHeaders = myHeaders.set("Application-Names", ["exampleApp", "proAngular"]);
        return this.http.request<T>(verb, url, {
            body: body,
            headers: myHeaders
        })/*.pipe(delay(5000)) Use this to simulate a delay in contacting the database*/.pipe(catchError((error: Response) => throwError(`This is my network error: error.statusText property is "${error.statusText}", and error.status property is "${error.status}".`)));

    }
}