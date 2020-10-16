import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers:[UserService]
})
export class HomePage implements OnInit {
  public token;
  public reporte: string;
  constructor(private menu:MenuController,
              private userService:UserService,
              private navCtrl:NavController,
              public load:LoadingController) { }

  ngOnInit() {
    this.token = this.userService.getToken();
    if(this.token == null){
      this.navCtrl.navigateRoot('tabs/tab1')
    }
    this.presentLoading();
    
  }

  mostrarMenu(){
    this.menu.open('first');
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

async presentLoading() {
   const loading = await this.load.create({
     message: 'Espere un momento',
     duration: 1000,
     spinner: 'crescent'
   });
   await loading.present();
 }
}
