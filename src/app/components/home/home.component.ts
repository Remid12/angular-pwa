import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  pushAutorize: boolean = false;

  ngOnInit() {
    Notification.requestPermission(result => {
      if (result === 'granted' && 'Notification' in window) {
        this.pushAutorize = true;
      } else {
        this.pushAutorize = false;
      }

    });
  }

  showStatusNotif(message: string, panelClass: string) {
    let config = new MatSnackBarConfig();
    config.duration = 200;
    config.panelClass = panelClass;

    this.snackBar.open(message, '', config);
  }

  pushNotification() {
    if (this.pushAutorize) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          tag: 'vibration-sample'
        });
      });
    }
  }

}
