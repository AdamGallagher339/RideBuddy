import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonList, IonItem, IonLabel, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRadio, IonRadioGroup, IonList, IonItem, IonLabel, IonButton, IonButtons, IonBackButton ],
  providers: [Storage],
})

export class LocationPage implements OnInit {

  myLocation: any = "";
  long: string = "";
  lat: string = "";
  county: string = "";
  country: string = "";
  timestamp: string = "";

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.storage.create();
    this.lat = await this.storage.get('lat');
    this.long = await this.storage.get('long');
    this.county = await this.storage.get('county');
    this.country = await this.storage.get('country');
    this.timestamp = await this.storage.get('timestamp');
    }

    async saveStatus() {
      this.myLocation = await Geolocation.getCurrentPosition();
      this.long = this.myLocation.coords.longitude;
      this.lat = this.myLocation.coords.latitude;

      await this.storage.set('lat', this.lat)
      await this.storage.set('long', this.long)
      .then(
      ()=>{
      this.router.navigate(['/home'])
      })
      .catch();
      }
      

}
