import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  categorie_mancare: any;
  categorie_bautura: any;
  produse_categorie: any;
  id_categorie: number;

  constructor(
    public router: Router,
    public apiService: ApiServiceService,
    public dialog: MatDialog,
    public notificationService: NotificationServiceService) { }

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
    this.get_lista_users();
    // this.get_lista_users();
    // this.adauga_utilizator();
    // this.set_categorii('bautura');
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
      height: "500px",
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
      height: "500px",
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

  Delogare() {
    localStorage.clear();
    location.reload();
  }

  //rapoarte
  raport_vanzari_produse_zi() {
    const dialogRef = this.dialog.open(RaportVanzariProduseZiComponent, {
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
}
