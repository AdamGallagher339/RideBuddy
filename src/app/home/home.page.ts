import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular'; 
import { RouterLinkWithHref } from '@angular/router';
import { addIcons } from 'ionicons';
import { fingerPrint, cog, navigateCircle } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, RouterLinkWithHref, HttpClientModule],
  providers: [Storage],
})

export class HomePage {

  //GeoLocation Variables
  lat: string = "";
  long: string = "";

  //API link variables
  q:string = this.lat+","+this.long;

  //Weather API Variables
  county: string = "";
  country:string = "";
  condition: string = "";
  icon: string = "";
  timestamp: string = "";
  temp: string = "";
  info: string = "";

  //Settings Variable
  darkMode: boolean = false;

  constructor(private storage:Storage,private http:HttpClient) {
    addIcons({fingerPrint, cog, navigateCircle})//ADD Header Icons
  }

  async ngOnInit() {
    await this.storage.create();//Initilize Storage 
    this.getData();// Retrieve data from API and Storage
    await this.setDarkMode();//Ensure DarkMode is persistant 
    console.log(this.darkMode);
  }

  async setDarkMode() {
      document.body.classList.toggle('dark', await this.storage.get('darkObj'));//Set dark mode in variables.scss
    
  }

  async getData() {// Pull data from both storage and the api

    this.lat = await this.storage.get('lat');
    this.long = await this.storage.get('long');

    console.log("this.lat ="+this.lat);
    if(this.lat != "")//catch to avoid errors where lat = "";
    {
    const url = "http://api.weatherapi.com/v1/current.json?key=d808ff769f7c4df6ab2162030240905&q="+this.lat+","+this.long+"&aqi=no";
    
    this.http.get(url).subscribe(
      (data:any) => {

        console.log(data);//printout data

        console.log(data.location.name)//name of county
        this.county = data.location.name;
        this.storage.set('county', this.county)

        console.log(data.location.country)//name of country
        this.country = data.location.country;
        this.storage.set('country', this.country)

        console.log(data.current.condition.text)//current weather 
        this.condition = data.current.condition.text;
        this.storage.set('condition', this.condition)

        console.log(data.current.condition.icon)//icon
        this.icon = data.current.condition.icon;
        this.storage.set('icon', this.icon)

        console.log(data.location.localtime)//timestamp
        this.timestamp = data.location.localtime;
        this.storage.set('timestamp', this.timestamp)

        console.log(data.current.feelslike_c)//temp feels like 
        this.temp = data.current.feelslike_c;
        this.storage.set('temp', this.temp)

        console.log(data.current.condition.code);//Recieve condition code for switch statement

        //Output text at bottom of screen depending on weather conditions
        switch(data.current.condition.code){
          case 1000:
            this.info = "Great weather for a ride on the bike, bring suncream and stay hydrated. Ride Safe!";
            this.storage.set('info', this.info)
            break;

          case 1006: case 1009: case 1003:
            this.info = "Good weather for a ride on the bike, be mindfull of decreasing visibility due to incoming clouds. Ride Safe!";
            this.storage.set('info', this.info)
            break;

          case 1030: case 1063: case 1066: case 1069: case 1072: case 1150: case 1153: case 1168: case 1180: case 1183: case 1204: case 1240:
            this.info = "Roads may be slippery, be observant and extra cautious";
            this.storage.set('info', this.info)
          break;

          case 1087: case 1114: case 1117:
            this.info = "WEATHER WARNING motorcycle transport is NOT ADVISED";
            this.storage.set('info', this.info)
          break;

          case 1135: case 1147:
            this.info = "Reduced Visibility, ensure all lights are working before departure. Ride Safe!";
            this.storage.set('info', this.info)
          break;

          case 1171: case 1186: case 1189: case 1192: case 1195: case 1198: case 1201: 
            this.info = "Bring a rain jacket and waterproof trousers. Ride Safe!";
            this.storage.set('info', this.info)
          break;

          default:
            this.info = "Error Generating report!";
            this.storage.set('info', this.info)
            break;
        }

      },
      (error) => {//error handeling 
        console.error('error fetching data:',error)
      });
    }
  }

  async ionViewWillEnter() {//get lat and long from storage once page is in view
    this.lat = await this.storage.get('lat');
    this.long = await this.storage.get('long');
  }

}