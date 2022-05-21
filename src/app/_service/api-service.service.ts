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
  DeleteUser(id){
    return this.http.get<any>(this.apiUrl+"/Login/DeleteUser/"+id,this.headers);
  }
  UpdateUser(user){
    return this.http.post<any>(this.apiUrl+"/Login/UpdateUser",user,this.headers);
  }
  AddUser(user){
    return this.http.post<any>(this.apiUrl+"/Login/AddUser",user,this.headers);
  }
  getUser(id){
    return this.http.get<any>(this.apiUrl+"/Login/GetUser/"+id,this.headers);
  }
  getUsers(){
    return this.http.get<any>(this.apiUrl+"/Login/getUsers",this.headers);
  }
  getUsersByRole(role){
    return this.http.get<any>(this.apiUrl+"/Login/getUsersByRole/"+role,this.headers);
  }
  getUsersRoles(){
    return this.http.get<any>(this.apiUrl+"/Login/GetUserRoles",this.headers);
  }
  createProdus(produs){
    return this.http.post<any>(this.apiUrl+"/Products/create",produs,this.headers);
  }
  editProdus(produs){
    return this.http.post<any>(this.apiUrl+"/Products/edit",produs,this.headers);
  }
  eliberare_masa(id_masa){
    return this.http.get<any>(this.apiUrl+"/Mese/EliberareMasa/"+id_masa+"/"+JSON.parse(localStorage.getItem('user'))['id'],this.headers);
  }
  get_mese(){
    return this.http.get<any>(this.apiUrl+"/Mese/GetMese",this.headers);
  }
  get_comanda(id){
    return this.http.get<any>(this.apiUrl+"/Comenzi/GetComanda/"+id,this.headers);
  }
  add_comanda(idMasa){
    return this.http.get<any>(this.apiUrl+"/Comenzi/AddComanda/"+idMasa,this.headers);
  }
  get_produse_masa(idcomanda){
    return this.http.get<any>(this.apiUrl+"/Products/GetProduseMasa/"+idcomanda,this.headers);
  }
  add_produse_masa(body){
    return this.http.post<any>(this.apiUrl+"/Products/AddProduseMasa",body,this.headers);
  }
  elimina_produs_masa(id){
    return this.http.get<any>(this.apiUrl+"/Products/EliminaProdusMasa/"+id,this.headers);
  }
  get_categorie_bauturi(){
    return this.http.get<any>(this.apiUrl+"/Products/GetCategorieBauturi",this.headers);
  }
  get_info_categorie(id){
    return this.http.get<any>(this.apiUrl+"/Products/GetInfoCategorieById/"+id,this.headers);
  }
  add_produs(produs){
    return this.http.post<any>(this.apiUrl+"/Products/AddProdus",produs,this.headers);
  }
  editeaza_produs(produs){
    return this.http.post<any>(this.apiUrl+"/Products/EditeazaProdus",produs,this.headers);
  }
  get_produs(id){
    return this.http.get<any>(this.apiUrl+"/Products/GetProdus/"+id,this.headers);
  }
  get_categorie_mancare(){
    return this.http.get<any>(this.apiUrl+"/Products/GetCategorieMancare",this.headers);
  }
  get_produse_by_categorie_id(id){
    return this.http.get<any>(this.apiUrl+"/Products/GetProduseByCategorieId/"+id,this.headers)
  }
  getProduseByUser(id){
    return this.http.get<any>(this.apiUrl+"/Products/getProduseByUser/"+id,this.headers);
  }
  getProdusSingle(id){
    return this.http.get<any>(this.apiUrl+"/Products/GetProdusSingle/"+id,this.headers);
  }
  getIstoricProduseByDate(date){
    return this.http.get<any>(this.apiUrl+"/Products/GetIstoricProduseByDate/"+date,this.headers);
  }
  getIstoricComenziByDate(date){
    return this.http.get<any>(this.apiUrl+"/Products/GetIstoricComenziByDate/"+date,this.headers);
  }
  stergereProdus(id){
    return this.http.get<any>(this.apiUrl+"/Products/DeleteProdus/"+id,this.headers);
  }
}
