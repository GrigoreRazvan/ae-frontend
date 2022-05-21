import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentComponent } from './login-component/login-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { ProdusNouComponent } from './produs-nou/produs-nou.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MeniuPrincipalComponent } from './meniu-principal/meniu-principal.component';
import { AdaugaProduseDialogComponent } from './masa/adauga-produse-dialog/adauga-produse-dialog.component';
import { MasaComponent } from './masa/masa.component';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { BonComponent } from './bon/bon.component';
import { NgxPrintModule } from 'ngx-print';
import { RaportVanzariProduseZiComponent } from './raport-vanzari-produse-zi/raport-vanzari-produse-zi.component';
import { MatDatepicker, MatDatepickerModule,  } from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { RaportComenziZiComponent } from './raport-comenzi-zi/raport-comenzi-zi.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    ProdusNouComponent,
    MeniuPrincipalComponent,
    MasaComponent,
    AdaugaProduseDialogComponent,
    UsersModalComponent,
    BonComponent,
    RaportVanzariProduseZiComponent,
    RaportComenziZiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    NgxPrintModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
