import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../_service/api-service.service';
import { NotificationServiceService } from '../_service/notification-service.service';
import { AdaugaProduseDialogComponent } from './adauga-produse-dialog/adauga-produse-dialog.component';

@Component({
  selector: 'app-masa',
  templateUrl: './masa.component.html',
  styleUrls: ['./masa.component.css']
})
export class MasaComponent implements OnInit {
  idMasa: number;
  Comanda: any;
  Produse: any;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceService,
    private notificationService: NotificationServiceService) { }

  ngOnInit(): void {
    this.Produse=null;
    this.route
      .paramMap
      .subscribe(params => {
        this.idMasa = params['params']['id'];
        this.apiService.get_comanda(this.idMasa).subscribe(val => {
          this.Comanda = val[0];
          if (this.Comanda) {
            this.apiService.get_produse_masa(this.Comanda.idComanda).subscribe(result => {
              this.Produse = result;
            })
          }
        })
        // Defaults to 0 if no query param provided.
        // this.page = +params['page'] || 0;
      });
    // this.openAdaugaPreparat('mancare');
  }

  bon_masa(id){
    this.router.navigate(['meniu/masa/'+id+'/bon']);
  }

  redirect_inapoi(){
    this.router.navigate(['meniu/principal']);
  }

  openAdaugaPreparat(tip) {
    const dialogRef = this.dialog.open(AdaugaProduseDialogComponent, {
      width: "600px",
      height: "500px",
      data: {
        tipPreparat: tip,
        id_masa: this.idMasa
      }
    });
    this.dialog.afterAllClosed.subscribe(val => {
      this.ngOnInit()
    });
  }

  elimina_produs(id) {
    this.apiService.elimina_produs_masa(id).subscribe(val => {
      this.notificationService.showMessage(val, 'Inchide');
      this.ngOnInit();
    })
  }

  eliberare_masa(id){
    var forSure=confirm('Eliberati masa '+this.idMasa+"?");
    if(forSure){
      this.apiService.eliberare_masa(id).subscribe(val=>{
        this.notificationService.showMessage(val,'Inchide');
        this.ngOnInit();
      })
    }
  }
}
