import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiServiceService } from '../_service/api-service.service';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  inputUsername = new FormControl("");
  inputPassword = new FormControl("");
  inputEmail = new FormControl("");
  error="";
  logare=true;
  constructor(public apiService: ApiServiceService,public router:Router) { }

  ngOnInit(): void {
  }

  login(){
    if(this.inputUsername.value=="" || this.inputPassword.value=="")
    {
      this.error="Completati campurile";
      return;
    }
    var user={
      "Username":this.inputUsername.value,
      "Password":this.inputPassword.value
    }

    this.apiService.login(user).subscribe(resp=>{
      console.log(resp);
      if(resp!=null){
        this.error="";
        localStorage.setItem("idUser",resp[0]['id']);
        this.router.navigate([""]);
      }else{
        this.error="Username sau Parola incorecte."
      }
    })
  }
  schimba(){
    this.logare=!this.logare;
  }
  creaza(){
    if(this.inputUsername.value=="" || this.inputPassword.value=="")
    {
      this.error="Completati campurile";
      return;
    }
    var user={
      "Username":this.inputUsername.value,
      "Password":this.inputPassword.value,
      "Email":this.inputEmail.value
    }
    this.apiService.createUser(user).subscribe(resp=>{
      console.log(resp);
      if(resp[0]['returnMsg']=="done"){
        this.error="";
        this.logare=true;
        this.inputUsername.setValue("");
        this.inputPassword.setValue("");
        this.inputEmail.setValue("");
      }else{
        this.error="Username sau Parola incorecte."
      }
    })
  }
}
