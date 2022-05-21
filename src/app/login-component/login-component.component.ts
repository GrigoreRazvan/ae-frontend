import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiServiceService } from '../_service/api-service.service';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  inputUsername = new FormControl("",[
    Validators.required
  ]);
  inputPassword = new FormControl("",[
    Validators.required
  ]);
  error="";
  constructor(public apiService: ApiServiceService,public router:Router) { }

  ngOnInit(): void {
  }

  login(){
    if(this.inputUsername.value=="" || this.inputPassword.value=="")
    {
      this.error="Introduceti utilizatorul si parola!";
      return;
    }
    var user={
      "Username":this.inputUsername.value,
      "Password":this.inputPassword.value
    }

    this.apiService.login(user).subscribe(resp=>{
      if(resp.length>0){
        this.error="";
        localStorage.setItem("user",JSON.stringify(resp[0]));
        this.router.navigate(["meniu/principal"]);
      }else{
        this.error="Username sau Parola incorecte."
      }
    })
  }
}
