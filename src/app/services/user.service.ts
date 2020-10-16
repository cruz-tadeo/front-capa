import {Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from './global';
import {User} from '../models/user';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient,
        private navCtrl:NavController
    ){
        this.url = Global.url;
    }

    register(user):Observable<any>{
        let params = user;

        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'X-Requested-With':'application/xhtml+xml'
        });

        return this._http.post(this.url+'register', params, {headers:headers});
    }

    signup(user, gettoken = null):Observable<any>{
        if(gettoken != null){
            user.gettoken = 'true';
        }
        
        let params = user;

        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'X-Requested-With':'application/xhtml+xml'
        });

        return this._http.post(this.url+'login', params, {headers:headers});
    }

    logout(token):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + token
            })
          };
        return this._http.get(this.url+'logout',httpOptions);
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
            return this.navCtrl.navigateRoot('tabs/tab1');
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }


    validaToken(token):boolean{
        let token_storage = this.getToken();

        if(token_storage == null){
            this.navCtrl.navigateRoot('/tabs/tab1');
            return false;
        }

        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + token
            })
          };

          this._http.get(this.url+'user',httpOptions);
            return true;
    }
}