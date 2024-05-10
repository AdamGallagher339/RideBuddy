import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular'; 
import { RouterLinkWithHref } from '@angular/router';
import { IonButtons, IonContent, IonHeader, IonBackButton, IonTitle, IonToolbar, IonButton, IonItem, IonToggle } from '@ionic/angular/standalone';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonItem, IonToggle, IonButtons, IonBackButton, IonButton, RouterLinkWithHref, IonToolbar, CommonModule, FormsModule],
  providers: [Storage],
})
export class SettingsPage implements OnInit {

  profilePic: string = "https://ionicframework.com/docs/img/demos/avatar.svg"; 
  firstName: string = "";
  lastName: string = "";
  password: string = "";
  email: string = "";

  darkMode: boolean = true;

  constructor(private storage:Storage) { }
  

  toggleDarkMode(){//toggles darkmode in theme/variable.scss
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    this.storage.set('darkObj', this.darkMode);
    console.log("this: "+ this.storage.get('darkMode'));
    if(this.darkMode) {
      this.storage.set('darkMode', 'true'); 
    } else {
      this.storage.set('darkMode','false');
    }
    console.log("dark mode is: "+this.darkMode);
  }

  removeData(){//Set all user data to a default setting
    this.storage.set('profilePic', this.profilePic)
    this.storage.set('firstName', this.firstName)
    this.storage.set('lastName', this.lastName)
    this.storage.set('password', this.password)
    this.storage.set('email', this.email)
  }

  async ngOnInit() {
    await this.storage.create();
    this.darkMode = await this.storage.get('darkMode');
  }

}
