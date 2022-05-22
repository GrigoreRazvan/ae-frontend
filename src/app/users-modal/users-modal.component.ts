import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeniuPrincipalComponent } from '../meniu-principal/meniu-principal.component';
import { ApiServiceService } from '../_service/api-service.service';
import { NotificationServiceService } from '../_service/notification-service.service';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css']
})
export class UsersModalComponent implements OnInit {

  inputUsername = new FormControl("", [
    Validators.required]);

  inputPassword = new FormControl("", [
    Validators.required]);

  inputEmail = new FormControl("", [
    Validators.required]);

  inputRole = new FormControl("", [
    Validators.required]);


  user: any;
  UserRoles:any;
  button_type:string;

  constructor(
    private notificationService: NotificationServiceService,
    private apiService: ApiServiceService,
    private dialog: MatDialogRef<MeniuPrincipalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.button_type = this.data['button_type'];
    if (this.data['id_user']) {

      this.apiService.getUser(this.data['id_user']).subscribe(val => {
        this.user = val[0];
        this.inputUsername.setValue(this.user.username);
        this.inputPassword.setValue(this.user.password);
        this.inputEmail.setValue(this.user.email);
        this.inputRole.setValue(this.user.role);

      });
    }
    this.apiService.getUsersRoles().subscribe(responses=>{
      this.UserRoles=responses;
    });

  }

  adauga_editeaza_user(){
    var user;
    if(this.user){
      user={
        id:this.user.id,
        email: this.inputEmail.value,
        password: this.inputPassword.value,
        role: parseInt(this.inputRole.value),
        username: this.inputUsername.value
      }
      this.apiService.UpdateUser(user).subscribe(val=>{
        this.notificationService.showMessage(val,"Inchide");
        this.redirect_inapoi();
      })
    }
    else{
      user={
        email: this.inputEmail.value,
        password: this.inputPassword.value,
        role: parseInt(this.inputRole.value),
        username: this.inputUsername.value
      }
      this.apiService.AddUser(user).subscribe(val=>{
        this.notificationService.showMessage(val,"Inchide");
        this.redirect_inapoi();
      })
    }

  }

  redirect_inapoi() {
    this.dialog.close();
  }
}
