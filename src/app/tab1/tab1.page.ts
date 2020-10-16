import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers:[UserService]
})
export class Tab1Page implements OnInit {
  public user:User;
  public token;
  public identity;
  public status:string;
  public role:string;
  public gettoken = true;
  constructor(private userService:UserService,
              private route: ActivatedRoute,
              private navCtrl: NavController,
              private menu:MenuController) {
                this.user = new User(1,'cliente','','','','');
                this.identity = this.userService.getIdentity();
              }

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  if(this.identity != null){
    this.navCtrl.navigateRoot('/home');
  }
  
}

ionViewWillEnter() {
  this.menu.enable(false);
}
onSubmit(form){
    this.userService.signup(this.user).subscribe(
      response=>{
        //token
        //alert(JSON.stringify(response));
      if(response.status != 'error'){
        this.status = 'success';
        this.token = response.access_token;
        localStorage.setItem('token',this.token);
        this.userService.signup(this.user, this.gettoken = true).subscribe(
        response=>{
          this.identity = response.user;
          console.log(this.identity);
          localStorage.setItem('identity', JSON.stringify(this.identity));
          //alert(JSON.stringify(response));
                                
            
          //redireccion
          this.navCtrl.navigateRoot('/home');
          window.location.reload();
                                
            },error=>{
              console.log(<any>error);
              alert(<any>error);
              });
      }else{
            this.status = 'error'
            }
      },error=>{
        console.log(<any>error);
          });
  }    
}

