import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${ code }`;

    return this.http.get<Country[]>(url)
      .pipe(
        // map sirve para transformar la información
        map(countries => countries.length > 0 ? countries[0]: null),
        // Captura el error y lo retorna en un nuevo "Observable" de un array vacio
        catchError(error => of(null))
      );
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${ term }`;
    return this.http.get<Country[]>(url)
      .pipe(
        // Captura el error y lo retorna en un nuevo "Observable" de un array vacio
        catchError(error => of([]))
      );


      /*
    "Tap1" muestra todas las countries, "map" transforma
    countries a un array vacio y "Tap2" lo muestra vacio

    return this.http.get<Country[]>(url)
    .pipe(
      tap( countries => console.log('Tap1', countries)),
      map( countries => []),
      tap( countries => console.log('Tap2', countries))
    );*/
  }
  searchCountry (term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${ term }`;
    return this.http.get<Country[]>(url)
    .pipe(
      // Captura el error y lo retorna en un nuevo "Observable" de un array vacio
      catchError(error => of([]))
    );
  }

  searchRegion (term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${ term }`;
    return this.http.get<Country[]>(url)
    .pipe(
      // Captura el error y lo retorna en un nuevo "Observable" de un array vacio
      catchError(error => of([]))
    );
  }

}
