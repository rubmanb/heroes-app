import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private _baseUrl: string = environment.baseUrl;

  constructor(public http: HttpClient) { }


  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this._baseUrl}/heroes`);
  }


  getHeroById(id: string): Observable<Hero|undefined>{
    return this.http.get<Hero>(`${this._baseUrl}/heroes/${id}`)
    .pipe(
      catchError(error => of(undefined))
    );
  }

  getSuggestions(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this._baseUrl}/heroes?q=${query}&_limit=6`);
  }
}
