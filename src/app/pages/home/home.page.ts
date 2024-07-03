import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular'; 
import { ToastController, IonRefresher } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //searchhhh
  @ViewChild('refresher', { static: false }) refresher!: IonRefresher;
/*data: any = undefined;
  dataOld: any = undefined;
  search: string = "";*/
  constructor(private http: HttpClient, private storage: Storage, private toastController: ToastController, private platform: Platform) {
    this.platform.ready().then(()=> this.getData());  
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    await toast.present();
  }

  doRefresh(event: Event) {
    setTimeout(() => {
      this.getData();
      (event as CustomEvent).detail.complete(); // Complete the refresh animation
    }, 1500);
  }
  

  getData() {
    // this.presentToast("Successfully logged in.");
    this.storage.create(); 
    const api_key = this.storage.get('api_key').then((api_key) => {
 
      const params = {
        apikey: api_key,
        type: 'GetAllCars',
        return: ['*'],
        sort: 'make',
        order: 'asc',
        limit: 50,
      };
    
      const username = 'u21487279';
      const password = 'Fum5#Acts#huey';
      const credentials = btoa(`${username}:${password}`); 

      const headers = new HttpHeaders({
        'Authorization': `Basic ${credentials}`
      });
      this.http.post('https://wheatley.cs.up.ac.za/u21487279/api.php', JSON.stringify(params), { headers })
        .subscribe((response: any) => {
          // console.log(response.data);
         
          // if (response.status == 200) {
            // console.log(response.data);
            this.create(response); 
            // if (this.refresher) {
            //   setTimeout(() => {
            //     this.refresher.complete();
            //   }, 2000);
            // }
            this.presentToast("Successfully retrieved data from the API.");
          // }
        },
          (error: any) => {
            console.log(error);
            console.log(error.status);
            console.log(error.data);
            this.presentToast("Failed to get data from API.");
          }
        );
    });  

    }

    create(response: any){
      const body = document.getElementsByTagName('main')[0];
      body.innerHTML = '';
      body.style.display = 'flex';
      body.style.flexWrap = 'wrap';
      body.style.justifyContent = 'center';

      for (let i = 0; i < response.data.length; i++) {
        const car = document.createElement('div');
        car.classList.add('car-picz');
        const img = document.createElement('img');
        img.classList.add('car-img');
        img.style.height = '190px';
        const title = document.createElement('h2');
        const speed = document.createElement('p');
        const transmission = document.createElement('p');
  
        speed.innerHTML = 'Top Speed: ' + response.data[i].max_speed_km_per_h + 'km/h';
        transmission.innerHTML = 'Transmission: ' + response.data[i].transmission;
        title.innerHTML = response.data[i].make + ' ' + response.data[i].model + ' ' + response.data[i].year_to;
  
        const brand = response.data[i].make;
        const model = response.data[i].model;
  
        this.getImg(img, brand, model); 
  
        car.appendChild(img);
        car.appendChild(title);
        car.appendChild(transmission);
        car.appendChild(speed);
        body.appendChild(car);
      }
    }

    getImg(image: HTMLImageElement, brand: string, model: string) {
      this.http.get('https://wheatley.cs.up.ac.za/api/getimage', {
        params: {
          brand: brand,
          model: model,
        },
        responseType: 'text',
      }).subscribe((result: any) => {
        image.src = result;
      });
    }
  ngOnInit() {
    // this.getData();
  }

}
