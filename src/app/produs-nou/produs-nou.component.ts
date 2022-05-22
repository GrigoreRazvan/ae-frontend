import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeniuPrincipalComponent } from '../meniu-principal/meniu-principal.component';
import { ApiServiceService } from '../_service/api-service.service';
import { NotificationServiceService } from '../_service/notification-service.service';

@Component({
  selector: 'app-produs-nou',
  templateUrl: './produs-nou.component.html',
  styleUrls: ['./produs-nou.component.css']
})
export class ProdusNouComponent implements OnInit {
  inputNume = new FormControl("", [
    Validators.required]);
  inputDescriere = new FormControl("", [
    Validators.required]);
  inputGramaj = new FormControl("", [
    Validators.required]);
  inputPret = new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]*$")]);

  id_categorie: number;
  categorie: any;
  produs: any;
  button_type: string;

  constructor(
    private notificationService: NotificationServiceService,
    private apiService: ApiServiceService,
    private dialog: MatDialogRef<MeniuPrincipalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.button_type = this.data['button_type'];
    if (this.data['id_categorie']) {
      this.id_categorie = this.data['id_categorie'];
      this.apiService.get_info_categorie(this.id_categorie).subscribe(val => {
        this.categorie = val[0];

      })
    }
    if (this.data['id_produs']) {
      this.apiService.get_produs(this.data['id_produs']).subscribe(val => {
        this.produs = val[0];
        this.inputNume.setValue(this.produs.nume)
        this.inputDescriere.setValue(this.produs.descriere)
        this.inputGramaj.setValue(this.produs.gramaj)
        this.inputPret.setValue(this.produs.pret)
      })
    }
  }

  adauga_editeaza_produs() {
    var produs;
    if (this.categorie) {
        produs = {
        IdCategorie: this.id_categorie,
        Nume: this.inputNume.value,
        Descriere: this.inputDescriere.value,
        Gramaj: this.inputGramaj.value,
        Pret: this.inputPret.value
      };
      this.apiService.add_produs(produs).subscribe(val => {
        this.notificationService.showMessage(val, "Inchide");
        this.redirect_inapoi();
      })
    }
    if(this.produs){
        produs = {
        IdProdus:this.produs.idProdus,
        IdCategorie: this.produs.idCategorie,
        Nume: this.inputNume.value,
        Descriere: this.inputDescriere.value,
        Gramaj: this.inputGramaj.value,
        Pret: this.inputPret.value
      };
      this.apiService.editeaza_produs(produs).subscribe(val=>{
        this.notificationService.showMessage(val,'Inchide');
        this.redirect_inapoi();
      })
    }
  }

  redirect_inapoi() {
    this.dialog.close();
  }
}
