import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _getOpt = `${environment.serverUrl}/options`;
  private _getPrice = `${environment.serverUrl}/getprice`;


  constructor(private http : HttpClient) { }

  getOptions(){
    return this.http.get(this._getOpt)
  }

  getPrice(object){
    return this.http.post(this._getPrice, object);
  }
}
