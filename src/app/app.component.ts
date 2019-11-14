import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Network } from '@ngx-pwa/offline';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'angular-pwa';
  status: boolean = this.network.online;

  constructor(protected network: Network, private router: Router, public snackBar: MatSnackBar) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkOnline();
      }
    });

    network.onlineChanges.subscribe(() => {
      this.checkOnline();
    });
  }

  checkOnline() {
    this.status = this.network.online;

    if (!this.status) {
      this.router.navigateByUrl('/offline');

      this.showStatusNotif('You are not connected to internet', 'is-offline');
    }

    if (this.status && this.router.url === '/offline') {
      this.router.navigateByUrl('/');

      this.showStatusNotif('you are connected', '');
    }
  }

  showStatusNotif(message: string, panelClass: string) {
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = panelClass;

    this.snackBar.open(message, '', config);
  }
}