import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  public formPush = new FormGroup({
    message: new FormControl('', [
      Validators.required,
    ])
  });

  pushAutorize: boolean = false;
  title: string = "Angular PWA";
  pushOptions = {
    body: this.formPush.value.message,
    icon: "/assets/icons/icon-96x96.png",
    vibrate: [200, 100, 200],
    badge: "/assets/icons/icon-96x96.png",
    actions: [{ action: "Detail", title: "Yolo test", icon: "/assets/icons/icon-96x96.png" }],
    click_action: "https://material.angular.io/"
  };

  ngOnInit() {
    //Check if notifications are authorized
    Notification.requestPermission(result => {
      if (result === 'granted' && 'Notification' in window) {
        this.pushAutorize = true;
      } else {
        this.pushAutorize = false;
      }
    });

    this.formPush.get('message').setValue('Custom message here');
  }

  showStatusNotif(message: string, panelClass: string) {
    let config = new MatSnackBarConfig();
    config.duration = 200;
    config.panelClass = panelClass;

    this.snackBar.open(message, '', config);
  }

  checkFormPush() {
    if (this.formPush.status === 'VALID') {
      this.pushNotification();
    }
  }

  pushNotification() {
    if (this.pushAutorize) {
      this.pushOptions.body = this.formPush.value.message;

      navigator.serviceWorker.ready.then(registration => {
        console.log(registration);
        registration.showNotification(this.title, this.pushOptions);
      });
    }
  }

}
