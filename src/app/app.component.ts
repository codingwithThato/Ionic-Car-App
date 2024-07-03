import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [ //this is for the sidetab
    { title: 'Cars', url: 'home', icon: 'car' },
    { title: 'Explore', url: 'search', icon: 'search' },
    { title: 'Logout', action: 'logout', icon: 'log-out' },
  ];

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    await toast.present();
  }
  
  logout() {
    this.storage.create();
    this.storage.clear().then(() => {
      this.menu.close();
      this.navCtrl.navigateRoot('/login'); 
      this.presentToast("Successfully logged out.");
    });
  }

  handleMenuAction(action: any) {
    if (action === 'logout') {
      this.logout();
    }
  }
}
