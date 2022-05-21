import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeniuPrincipalComponent } from '../meniu-principal/meniu-principal.component';
import { ApiServiceService } from '../_service/api-service.service';
import { NotificationServiceService } from '../_service/notification-service.service';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-raport-comenzi-zi',
  templateUrl: './raport-comenzi-zi.component.html',
  styleUrls: ['./raport-comenzi-zi.component.css']
})
export class RaportComenziZiComponent implements OnInit {
  dateSelect = new FormControl("", [
    Validators.required]);
  total_cost:number=0;
  Comenzi: any;
  Ospatari:any={};
  constructor(private notificationService: NotificationServiceService,
    private apiService: ApiServiceService,public datepipe: DatePipe,
    private dialog: MatDialogRef<MeniuPrincipalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  alegere_data(){
    this.apiService.getIstoricComenziByDate(this.datepipe.transform(this.dateSelect.value, 'dd-MM-yyyy')).subscribe(responses=>{
      this.Comenzi=responses;
      if(this.Comenzi.length!=0){
        this.apiService.getUsersByRole('ospatar').subscribe(resp=>{
          resp.forEach(element => {
            this.Ospatari[element.id] = element;
          });
        });
      }
      this.Comenzi.forEach(element => {
        this.total_cost+=element.valoareComanda;
      });
      console.log(this.Comenzi,this.Comenzi.length);
    });
  }

  redirect_inapoi() {
    this.dialog.close();
  }
}
