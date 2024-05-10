import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonList, IonItem, IonLabel, IonButton, IonButtons, IonBackButton, IonInput, IonAvatar, IonAlert } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.page.html',
  styleUrls: ['./identity.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonAlert, IonAvatar, IonInput, IonList, IonItem, IonTitle, IonToolbar, CommonModule, FormsModule, IonRadio, IonRadioGroup, IonList, IonItem, IonLabel, IonButton, IonButtons, IonBackButton ],
  providers: [Storage],
})
export class IdentityPage implements OnInit {

  public alertButtons = ['Submit'];
  public alertInputs = [
    {
      placeholder: 'image link',
    },
  ];

  profilePic: string = "https://ionicframework.com/docs/img/demos/avatar.svg"; 
  firstName: string = "";
  lastName: string = "";
  password: string = "";
  email: string = "";

  constructor(private storage: Storage) { }

  saveChange(){//save all changes to storage
    this.storage.set('profilePic', this.profilePic)
    this.storage.set('firstName', this.firstName)
    this.storage.set('lastName', this.lastName)
    this.storage.set('password', this.password)
    this.storage.set('email', this.email)
  }

  async ngOnInit() {//retrieve all saved data on page open
    await this.storage.create();
    this.profilePic = await this.storage.get('profilePic');
    this.firstName = await this.storage.get('firstName');
    this.lastName = await this.storage.get('lastName');
    this.password = await this.storage.get('password');
    this.email = await this.storage.get('email');
  }

}
