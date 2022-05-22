import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NotificationServiceService } from 'src/app/_service/notification-service.service';
import { MasaComponent } from '../masa.component';

@Component({
  selector: 'app-adauga-produse-dialog',
  templateUrl: './adauga-produse-dialog.component.html',
  styleUrls: ['./adauga-produse-dialog.component.css']
})
export class AdaugaProduseDialogComponent implements OnInit {

  tip_meniu:string;
  categorie_bautura:any;
  categorie_mancare:any;
  produse:any;
  lista_produse:any=[];
  categorie_bautura_id:number;
  categorie_mancare_id:number;

  produseForm=new FormControl();
  itemsFormGroup:FormGroup;


  constructor(
    private notificationService:NotificationServiceService,
    private apiService:ApiServiceService,
    private dialog: MatDialogRef<MasaComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.itemsFormGroup = new FormGroup({
      forInitialize: new FormControl()
   });
    if(this.data['tipPreparat']=='bautura'){
      this.tip_meniu="b";
      this.apiService.get_categorie_bauturi().subscribe(val=>{
        this.categorie_bautura=val;
      })
    }
    if(this.data['tipPreparat']=='mancare'){
      this.tip_meniu="m";
      this.apiService.get_categorie_mancare().subscribe(val=>{
        this.categorie_mancare=val;
      })
    }
    //forr test
    // this.on_change_categorie_mancare(3);
    // this.on_change_categorie_bautura(1);
  }
  on_change_categorie_mancare(categorie){
    this.categorie_mancare_id=categorie;
    if(categorie==-1){
      this.produse=null;
      return;
    }
    this.apiService.get_produse_by_categorie_id(categorie).subscribe(val=>{
      this.produse=val;
    })
  }
  on_change_categorie_bautura(categorie){
    this.categorie_bautura_id=categorie;
    if(categorie==-1){
      this.produse=null;
      return;
    }
    this.apiService.get_produse_by_categorie_id(categorie).subscribe(val=>{
      this.produse=val;
    })
  }
  on_change_select_produse(selectedProducts){
    for(var i=0;i<selectedProducts.length;i++){
      var gasit=false;
        for(var j=0;j<this.lista_produse.length;j++){
          if(selectedProducts[i].idProdus==this.lista_produse[j].idProdus){
            gasit=true;
            break;
          }
        }
      if(!gasit){
        this.lista_produse.push(selectedProducts[i]);
      }
    }
    this.itemsFormGroup=new FormGroup({});
    for(var i=0;i<this.lista_produse.length;i++){
      this.itemsFormGroup.addControl('produs_input_'+i,new FormControl('',[Validators.required]));
    }
  }
  elimina_produs_din_lista(id){
    for(var j=0;j<this.lista_produse.length;j++){
      if(id==this.lista_produse[j].idProdus){
        this.lista_produse.splice(j,1)
        break;
      }
    }
  }

  adauga_produse(){
    var produse_to_add=[];
    this.apiService.get_comanda(this.data['id_masa']).subscribe(val=>{
      if(!val[0]){
        this.apiService.add_comanda(this.data['id_masa']).subscribe(val=>{
          var id_comanda=val['idComanda'];
          this.notificationService.showMessage("Adaugata ",'Inchide');
          for(var i=0;i<this.lista_produse.length;i++){
            var produs={
              "IdComanda":id_comanda,
              "IdProdus":this.lista_produse[i].idProdus,
              "Cantitate":parseInt(this.itemsFormGroup.controls['produs_input_'+i].value)
            };
            produse_to_add.push(produs);
          }
         this.apiService.add_produse_masa(JSON.stringify(produse_to_add)).subscribe(val =>{
          this.notificationService.showMessage(val,'Inchide');
          this.dialog.close();
         })
        })
      }else{
        var id_comanda=val[0]['idComanda'];
        for(var i=0;i<this.lista_produse.length;i++){
          var produs={
            "IdComanda":id_comanda,
            "IdProdus":this.lista_produse[i].idProdus,
            "Cantitate":parseInt(this.itemsFormGroup.controls['produs_input_'+i].value)
          };
          produse_to_add.push(produs);
        }
       this.apiService.add_produse_masa(JSON.stringify(produse_to_add)).subscribe(val =>{
        this.notificationService.showMessage(val,'Inchide');
        this.dialog.close();
       })
      }

    });
  }

  redirect_inapoi() {
    this.dialog.close();
  }
}
