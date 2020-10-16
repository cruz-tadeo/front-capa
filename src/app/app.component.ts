import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[UserService]
})
export class AppComponent implements OnInit {
  public token;
  public identity;
  public status;
  public selectedIndex = 0;
  public pages = [
    {
      title: 'Home',
      url:'/home',
      icon:'home'
    },
    {
      title: 'Reportes',
      icon:'alert-circle-outline',
      class:'reporte',
      children:[
        {
          title:'No hay agua',
          url:'/reporte/Agua'
        },
        {
          title:'Fugas',
          url:'/reporte/Fuga'
        },
        {
          title:'Medidor roto o perdido',
          url:'/reporte/Medidor'
        },
        {
          title:'Tomas clandestinas',
          url:'/reporte/Toma'
        },
        {
          title:'Consumo excesivo',
          url:'/reporte/Consumo'
        },
        {
          title:'Quejas o Denuncias',
          url:'/reporte/Queja'
        }
      ]
    }
    ,
    {
      title: 'Consultas',
      icon:'search-circle-outline',
      children:[
       {
          title:'Reportes',
          url:'/consulta/'
        },
        {
          title:'Consulta de saldo',
          url:'/consulta/'
        }
      ]
    },
    {
      title:'Registro Contrato',
      url:'/registro/contrato',
      icon:'add-circle-outline'
    },
    {
      title:'Pago de servicio',
      url:'/pago-servicio',
      icon:'card-outline'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService:UserService,
    private router:Router,
    private navCtrl:NavController
  ) {
    this.initializeApp();
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const path = window.location.pathname.split('reporte/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.pages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.token = this.userService.getToken();

    });
  }

  logout(){
    alert(JSON.stringify(this.token));
    this.userService.logout(this.token).subscribe(
      response => {
         if(response.status == 'success'){
           localStorage.removeItem('identity');
           localStorage.removeItem('token');
           this.navCtrl.navigateRoot('/tabs/tab1');
         }else{
           this.status = 'error';
         }
         //window.location.href = "/tabs/tab1";
      },
      error =>{
         console.log(<any>error);
         alert(JSON.stringify(<any>error));
      }
    );
  }
}
