import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private readonly apiUrl = "https://localhost:5001/api";
  constructor(private http: HttpClient) { }
  headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  login(user){
    return this.http.post<any>(this.apiUrl+"/Login/login",user,this.headers);
  }
  createUser(user){
    return this.http.post<any>(this.apiUrl+"/Login/create",user,this.headers);
  }
  getUser(id){
    return this.http.get<any>(this.apiUrl+"/Login/GetUser/"+id,this.headers);
  }
  createProdus(produs){
    return this.http.post<any>(this.apiUrl+"/Products/create",produs,this.headers);
  }
  editProdus(produs){
    return this.http.post<any>(this.apiUrl+"/Products/edit",produs,this.headers);
  }
  getProduse(){
    return this.http.get<any>(this.apiUrl+"/Products/GetProduse",this.headers);
  }
  getProduseByUser(id){
    return this.http.get<any>(this.apiUrl+"/Products/getProduseByUser/"+id,this.headers);
  }
  getProdusSingle(id){
    return this.http.get<any>(this.apiUrl+"/Products/GetProdusSingle/"+id,this.headers);
  }
  stergereProdus(id){
    return this.http.get<any>(this.apiUrl+"/Products/DeleteProdus/"+id,this.headers);
  }
}
