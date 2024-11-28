import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        // delay(2000)
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        // map sirve para transformar la información
        map(countries => countries.length > 0 ? countries[0] : null),
        // Captura el error y lo retorna en un nuevo "Observable" de un array vacio
        catchError(error => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        //Con "tap" entramos y lo ejecuta pero no influye en el funcionamiento del "Observable"
        tap(countries => this.cacheStore.byCapital = { term, countries }) //lo igualo a un nuevo objeto que es "term: term, countries: countries" pero abreviado
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
  searchCountry(term: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${term}`;
    console.log(url)
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term, countries })
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries })
        );
  }

}
