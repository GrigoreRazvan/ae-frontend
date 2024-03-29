import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
