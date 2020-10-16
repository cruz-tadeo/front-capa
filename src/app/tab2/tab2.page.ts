import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers:[UserService]
})
export class Tab2Page{
  identity;
  status: string;
  user:User;

  constructor(
    private userService:UserService,
    private navCtrl:NavController,
    public alertController: AlertController 
  ) { 
    this.user = new User(1,'cliente','','','','');
    this.identity = this.userService.getIdentity();
    if(this.identity != null){
      this.navCtrl.navigateRoot('/home');
    }
  }

onSubmit(form){
  this.userService.register(this.user).subscribe(
      response => {
        console.log(response);
         if(response.status == 'success'){
           this.status = response.status; 
           //vaciar el formulario
           this.user = new User(1,'cliente','','','','');
           form.reset();
           this.presentAlert(); 
         }else{
           this.status = 'error';
         }
      },
      error =>{
         console.log(<any>error);
         alert(<any>JSON.stringify(error));
      }
    );

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass:'alert',
      header: 'Cuenta Creada',
      animated:true,
      message: 'Su cuenta ha sido creada con exito, inicie sesion',
      buttons: [{
        text:'Aceptar',
        handler:()=>{
          this.navCtrl.navigateRoot("/tabs/tab1");
        }
      }]
    });
  
    alert.present();
  }

}

