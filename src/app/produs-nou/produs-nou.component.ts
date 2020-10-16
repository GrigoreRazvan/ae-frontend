import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../_service/api-service.service';

@Component({
  selector: 'app-produs-nou',
  templateUrl: './produs-nou.component.html',
  styleUrls: ['./produs-nou.component.css']
})
export class ProdusNouComponent implements OnInit {
  inputDenumire=new FormControl("");
  inputDescriere=new FormControl("");
  inputPret=new FormControl("");
  
  error="";
  button="";
  constructor(public http:HttpClient,public router:Router,public apiService:ApiServiceService) { }

  ngOnInit(): void {
    if(localStorage.getItem('editProdus')==null||localStorage.getItem('editProdus')==""){
      this.button="creaza";
      this.inputDenumire.setValue("");
      this.inputDescriere.setValue("");
      this.inputPret.setValue("");
      
    }else{
      this.button="editeaza";
      this.apiService.getProdusSingle(localStorage.getItem('editProdus')).subscribe(resp=>{
        this.inputDenumire.setValue(resp[0]['denumire']);
        this.inputDescriere.setValue(resp[0]['descriere']);
        this.inputPret.setValue(resp[0]['pret']);
      })
    }
  }

  creaza(){
    var produs={
      "Denumire":this.inputDenumire.value,
      "Descriere":this.inputDescriere.value,
      "DataAdaugare":new Date(),
      "AdaugatDe":parseInt(localStorage.getItem('idUser')),
      "Pret":parseInt(this.inputPret.value),
    }
    this.apiService.createProdus(produs).subscribe(resp=>{
      if(resp[0]['returnMsg']=="done"){
        this.router.navigate([""]);
      }else
      {
        this.error=resp[0]['returnMsg'];
      }
    })
  }
  editeaza(){
    var produs={
      "Id":parseInt(localStorage.getItem('editProdus')),
      "Denumire":this.inputDenumire.value,
      "Descriere":this.inputDescriere.value,
      "DataAdaugare":new Date(),
      "AdaugatDe":parseInt(localStorage.getItem('idUser')),
      "Pret":parseInt(this.inputPret.value),
    }
    this.apiService.editProdus(produs).subscribe(resp=>{
      if(resp[0]['returnMsg']=="done"){
        this.router.navigate([""]);
        localStorage.setItem('editProdus',"");
      }else
      {
        this.error=resp[0]['returnMsg'];
      }
    })
  }
}
