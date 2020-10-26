import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  isLoading = false;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) { }

  async presentPopup(popupMessage: string, title = 'Error') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: popupMessage,
      buttons: [
        {
          text: 'Okay',
          role: 'Okay',
          handler: () => {
          }
        },
      ]
    });
    await alert.present();
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
      keyboardClose: true,
      message: 'Please wait...',
      cssClass: 'my-custom-class',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async presentToast(toastMessage) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      animated: true,
      color: 'light',
      keyboardClose: true,
    });
    toast.present();
  }

  async presentBookingConfirmation(popupMessage: string, title = 'Error') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: popupMessage,
      buttons: [
        {
          text: 'Okay',
          role: 'Okay',
          handler: () => {
            return true;
          }
        },
      ]
    });
    await alert.present();
  }

}
