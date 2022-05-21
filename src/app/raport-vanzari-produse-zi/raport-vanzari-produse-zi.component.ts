import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeniuPrincipalComponent } from '../meniu-principal/meniu-principal.component';
import { ApiServiceService } from '../_service/api-service.service';
import { NotificationServiceService } from '../_service/notification-service.service';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-raport-vanzari-produse-zi',
  templateUrl: './raport-vanzari-produse-zi.component.html',
  styleUrls: ['./raport-vanzari-produse-zi.component.css']
})
export class RaportVanzariProduseZiComponent implements OnInit {
  dateSelect = new FormControl("", [
    Validators.required]);
  total_cost: number = 0;
  Produse: any;

  constructor(private notificationService: NotificationServiceService,
    private apiService: ApiServiceService, public datepipe: DatePipe,
    private dialog: MatDialogRef<MeniuPrincipalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  alegere_data() {
    this.apiService.getIstoricProduseByDate(this.datepipe.transform(this.dateSelect.value, 'dd-MM-yyyy')).subscribe(responses => {
      this.Produse = responses;
      this.Produse.forEach(element => {
        this.total_cost += element.produs.pret * element.produsInter.cantitate
      });
      console.log(this.Produse, this.Produse.length);
    });
  }

  redirect_inapoi() {
    this.dialog.close();
  }
}
