import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private _baseUrl: string = environment.baseUrl;

  constructor(public http: HttpClient) { }


  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this._baseUrl}/heroes`);
  }
}