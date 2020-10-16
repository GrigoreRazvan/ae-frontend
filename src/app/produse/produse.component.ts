import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../_service/api-service.service';

@Component({
  selector: 'app-produse',
  templateUrl: './produse.component.html',
  styleUrls: ['./produse.component.css']
})
export class ProduseComponent implements OnInit {
  Produse:any;
  ProduseleMele:any;
  iduser;
  username="";
  constructor(public router:Router,public apiService:ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.getProduse().subscribe(resp=>{
      this.Produse=resp;
    });
    this.iduser=localStorage.getItem('idUser');
    this.apiService.getProduseByUser(this.iduser).subscribe(resp=>{
      this.ProduseleMele=resp;
    });
    if(this.iduser!=null)
    this.apiService.getUser(this.iduser).subscribe(resp=>{
      if(resp!=null)
      {
        this.username=resp[0]['username'];
      }
    })
  }

  produsNou(){
    if(localStorage.getItem('idUser')!=null)
    {
    this.router.navigate(['produs-nou']);
    }
    else{
      this.router.navigate(['login']);
    }
  }
  EditareProdus(id){
    localStorage.setItem('editProdus',id);
    this.router.navigate(['produs-nou']);
  }
  Delogare(){
    localStorage.clear();
    location.reload();
  }
  Logare(){
    this.router.navigate(['login']);
  }
  StergereProdus(id){
    this.apiService.stergereProdus(id).subscribe(resp=>{
      if(resp[0]['returnMsg']=="done") location.reload();
      else alert(resp[0]['returnMsg']);
    })
  }
}
