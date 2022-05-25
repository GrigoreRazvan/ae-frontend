import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { ProdusNouComponent } from '../produs-nou/produs-nou.component';
import { RaportComenziZiComponent } from '../raport-comenzi-zi/raport-comenzi-zi.component';
import { RaportVanzariProduseZiComponent } from '../raport-vanzari-produse-zi/raport-vanzari-produse-zi.component';
import { UsersModalComponent } from '../users-modal/users-modal.component';
import { ApiServiceService } from '../_service/api-service.service';
import { NotificationServiceService } from '../_service/notification-service.service';

@Component({
  selector: 'app-meniu-principal',
  templateUrl: './meniu-principal.component.html',
  styleUrls: ['./meniu-principal.component.css']
})
export class MeniuPrincipalComponent implements OnInit {
  Mese: any;
  ProduseleMele: any;
  user: any;
  Users: any;
  UserRoles: any;
  categorie: any;
  categorie_mancare: any;
  categorie_bautura: any;
  produse_categorie: any;
  id_categorie: number;
  show_charts:string;

  //chart comenzi mese
  title_chart_mese = 'Nr total comenzi pe mese';
  type_chart_mese = 'ColumnChart';
  data_chart_mese = [];
  columnNames_chart_mese = ['Nr Masa', 'Numar Comenzi'];
  options_chart_mese = {
    colors: ['#DD782F'],
    chartArea: {
      left: 60,
      top: 30,
      width: '65%',
      height: '50%'
    }
  };
  width_chart_mese = 655;
  height_chart_mese = 400;

  //chart valoare mese
  title_chart_valoare_mese = 'Valoare totala comenzi pe mese';
  type_chart_valoare_mese = 'ColumnChart';
  data_chart_valoare_mese = [];
  columnNames_valoare_chart_mese = ['Nr Masa', 'Valoare Comanda'];
  options_chart_valoare_mese = {
    colors: ['#FFB4B4'],
    chartArea: {
      left: 60,
      top: 30,
      width: '50%',
      height: '50%'
    }
  };
  width_chart_valoare_mese = 950;
  height_chart_valoare_mese = 400;

  //chart comenzi pe zi
  title_chart_comenzi_pe_zi = 'Numar comenzi pe zile';
  type_chart_comenzi_pe_zi = 'LineChart';
  data_chart_comenzi_pe_zi = [];
  columnNames_chart_comenzi_pe_zi = ['Data', 'Numar Comenzi'];
  options_chart_comenzi_pe_zi = {
    colors: ['#FFB4B4'],
    chartArea: {
      left: 60,
      top: 30,
      width: '50%',
      height: '50%'
    }
  };
  width_chart_comenzi_pe_zi = 950;
  height_chart_comenzi_pe_zi = 400;

  //chart vanzari pe zi
  title_chart_vanzari_pe_zi = 'Vanzari pe zile';
  type_chart_vanzari_pe_zi = 'LineChart';
  data_chart_vanzari_pe_zi = [];
  columnNames_chart_vanzari_pe_zi = ['Data', 'Vanzari'];
  options_chart_vanzari_pe_zi = {
    colors: ['#FFB4B4'],
    chartArea: {
      left: 60,
      top: 30,
      width: '50%',
      height: '50%'
    }
  };
  width_chart_vanzari_pe_zi = 950;
  height_chart_vanzari_pe_zi = 400;


  constructor(
    public router: Router,
    public apiService: ApiServiceService,
    public dialog: MatDialog,
    public notificationService: NotificationServiceService,
    public datePipe:DatePipe) { }

  ngOnInit(): void {

    this.apiService.get_mese().subscribe(resp => {
      this.Mese = resp;
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null) {
      this.apiService.getUser(this.user.id).subscribe(resp => {
        if (resp != null) {
          this.user = resp[0];
        }
      })
    } else {
      this.router.navigate(['']);
    }


    //for test
    this.get_charts();
    // this.set_categorii('mancare');
    // this.get_produse_categorie(1);
    // this.adauga_utilizator();
    // this.get_lista_users();
    // this.get_produse_categorie(1);
    // this.get_lista_users();
    // this.adauga_utilizator();
    // this.set_categorii('bautura');
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    switch(tabChangeEvent.index){
      case 1: this.set_categorii('bautura');break;
      case 4: this.get_charts();break;
    }
  }
  selectare_masa(id) {
    this.router.navigate(['meniu/masa', id]);
  }

  get_lista_users() {
    this.apiService.getUsers().subscribe(val => {
      this.Users = val;
      this.apiService.getUsersRoles().subscribe(responses => {
        this.UserRoles = responses;
        this.Users.forEach(user => {
          this.UserRoles.forEach(role => {
            if (user.role == role.roleId) {
              user.roleName = role.roleName;
            }
          });
        });
      })
    });
  }

  adauga_utilizator() {
    const dialogRef = this.dialog.open(UsersModalComponent, {
      width: "600px",
      height: "400px",
      data: {
        button_type: 'Adauga'
      }
    });
    this.dialog.afterAllClosed.subscribe(val => {
      this.ngOnInit()
    });
  }

  editeaza_utilizator(id) {

    const dialogRef = this.dialog.open(UsersModalComponent, {
      width: "600px",
      height: "500px",
      data: {
        id_user: id,
        button_type: 'Editeaza'
      }
    });
    this.dialog.afterAllClosed.subscribe(val => {
      this.ngOnInit()
    });
  }

  stergere_utilizator(id, nume) {
    var forSure = confirm("Stergeti utilizatorul " + nume + "?");
    if (forSure) {
      this.apiService.DeleteUser(id).subscribe(val => {
        this.notificationService.showMessage(val, "Inchide");
        this.get_lista_users();
      })
    }
  }

  set_categorii(categorie) {
    this.categorie = categorie;
    if (categorie == 'bautura') {
      this.apiService.get_categorie_bauturi().subscribe(val => {
        this.categorie_bautura = val;
        this.categorie_mancare = null;

        //for test
        // this.get_produse_categorie(1);
      })
    }
    if (categorie == 'mancare') {
      this.apiService.get_categorie_mancare().subscribe(val => {
        this.categorie_mancare = val;
        this.categorie_bautura = null;
      })
    }
  }

  get_produse_categorie(id) {
    this.id_categorie = id;
    this.apiService.get_produse_by_categorie_id(id).subscribe(val => {
      this.produse_categorie = val;
      //for test
      // this.open_editeaza_produs(11);
    })
  }

  adauga_la_meniu() {
    const dialogRef = this.dialog.open(ProdusNouComponent, {
      width: "600px",
      height: "400px",
      data: {
        id_categorie: this.id_categorie,
        button_type: 'Adauga'
      }
    });
    this.dialog.afterAllClosed.subscribe(val => {
      this.ngOnInit()
    });
  }

  open_editeaza_produs(id_produs) {
    const dialogRef = this.dialog.open(ProdusNouComponent, {
      width: "600px",
      height: "500px",
      data: {
        id_produs: id_produs,
        button_type: 'Editeaza'
      }
    });
    this.dialog.afterAllClosed.subscribe(val => {
      this.ngOnInit()
    });
  }

  StergereProdus(id) {
    this.apiService.stergereProdus(id).subscribe(val => {
      this.notificationService.showMessage(val, 'Inchide');
    })
  }

  //rapoarte
  raport_vanzari_produse_zi() {
    const dialogRef = this.dialog.open(RaportVanzariProduseZiComponent, {
      width: "600px",
      height: "800px",
      data: {
        button_type: 'Adauga'
      }
    });
    this.dialog.afterAllClosed.subscribe(val => {
      this.ngOnInit()
    });
  }
  raport_comenzi_zi() {
    const dialogRef = this.dialog.open(RaportComenziZiComponent, {
      width: "600px",
      height: "500px",
      data: {
        button_type: 'Adauga'
      }
    });
    this.dialog.afterAllClosed.subscribe(val => {
      this.ngOnInit()
    });
  }

  get_charts() {
    //chart Comenzi masa
    this.apiService.get_chart_comenzi_mese().subscribe(val => {
      var datas = [];
      val.forEach(element => {
        if (datas.filter(x => x.masa == element['numarMasa']).length == 0) {
          datas.push({ 'masa': element['numarMasa'], 'comenzi': 1 });
          // console.log(element['numarMasa'],datas);
        }
        else {
          datas.filter(x => x.masa == element['numarMasa'])[0]['comenzi']++;
        }
      });
      datas.forEach(element => {
        this.data_chart_mese.push(['Masa '+element['masa'],element['comenzi']]);
      });
    });

    //chart valoare totala comenzi mese
    this.apiService.get_chart_valoare_comenzi_mese().subscribe(val => {
      var datas = [];
      val.forEach(element => {
        if (datas.filter(x => x.masa == element['numarMasa']).length == 0) {
          datas.push({ 'masa': element['numarMasa'], 'valoareComanda': element['valoareComanda'] });
          // console.log(element['numarMasa'],datas);
        }
        else {
          datas.filter(x => x.masa == element['numarMasa'])[0]['valoareComanda']+=element['valoareComanda'];
        }
      });
      datas.forEach(element => {
        this.data_chart_valoare_mese.push(['Masa '+element['masa'],element['valoareComanda']]);
      });
    });

    //chart comenzi pe zile
    this.apiService.get_chart_comenzi_pe_zile().subscribe(val => {
      var datas = [];
      var datas_vanzari=[];
      val.forEach(element => {
        if (datas.filter(x => x.dataComanda == this.datePipe.transform(element['dataComanda'],"dd/MM/yyyy")).length == 0) {
          datas.push({ 'dataComanda': this.datePipe.transform(element['dataComanda'],"dd/MM/yyyy"), 'comenzi': 1 });
          datas_vanzari.push({ 'dataComanda': this.datePipe.transform(element['dataComanda'],"dd/MM/yyyy"), 'valoareComanda': element['valoareComanda'] });
        }
        else {
          datas.filter(x => x.dataComanda == this.datePipe.transform(element['dataComanda'],"dd/MM/yyyy"))[0]['comenzi']++;
          datas_vanzari.filter(x => x.dataComanda == this.datePipe.transform(element['dataComanda'],"dd/MM/yyyy"))[0]['valoareComanda']+=element['valoareComanda'];
        }
      });
      datas.forEach(element => {
        this.data_chart_comenzi_pe_zi.push([element['dataComanda'],element['comenzi']]);
      });
      datas_vanzari.forEach(element => {
        this.data_chart_vanzari_pe_zi.push([element['dataComanda'],element['valoareComanda']]);
      });
      console.log(this.data_chart_vanzari_pe_zi);
    });
  }
}
