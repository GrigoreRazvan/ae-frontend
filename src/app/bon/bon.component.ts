import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../_service/api-service.service';
import { NotificationServiceService } from '../_service/notification-service.service';

@Component({
  selector: 'app-bon',
  templateUrl: './bon.component.html',
  styleUrls: ['./bon.component.css']
})
export class BonComponent implements OnInit {

  id_masa:number;
  Comanda:any;
  produse:any;

  @ViewChild('printBon',{static:false}) printBon:ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceService,
    private notificationService: NotificationServiceService) { }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(params => {
        this.id_masa = params['params']['id'];
        this.apiService.get_comanda(this.id_masa).subscribe(val=>{
          this.Comanda=val[0];
          this.apiService.get_produse_masa(this.Comanda.idComanda).subscribe(response=>{
            this.produse=response;
          })
        })
      });
  }


  redirect_inapoi(){
    this.router.navigate(['meniu/masa',this.id_masa]);
  }

}
