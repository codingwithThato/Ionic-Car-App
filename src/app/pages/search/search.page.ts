import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular'; 
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery = '';
  cars: any[] = []; 
  // apikey: string = ''; 

  // data: any = undefined;
  // dataOld: any = undefined;
  // search: string = "";
  constructor(private http: HttpClient, private storage: Storage, private toastController: ToastController, private platform: Platform) {
    // this.platform.ready().then(()=> this.getData());  
  }

  // ionViewDidEnter() {
  //   this.storage.get('api_key').then((api_key) => {
  //     this.apikey = api_key;
  //   });
  // }

  search() {
    const params = {
      studentnum:"u21487279",
      type:"GetAllCars",
      search: {
        make: this.searchQuery
      },
      apikey:"a9198b68355f78830054c31a39916b7f",
      return:"*"
    };

    const username = 'u21487279';
    const password = 'Fum5#Acts#huey';
    const credentials = btoa(`${username}:${password}`); 

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });
    
    this.http.post('https://wheatley.cs.up.ac.za/api/', JSON.stringify(params), { headers })
    .subscribe(
      (response: any) => {
        // if (response.status === 200) {
          // this.cars = response.data;
          this.create(response);
          this.presentToast("Successfully retrieved cars from the API.");  
        // }
      },
      (error: any) => {
        console.log(error);
        this.presentToast("Failed to search cars from API.");
      }
    );
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    await toast.present();
  }

  

  ngOnInit() {
  }

}
