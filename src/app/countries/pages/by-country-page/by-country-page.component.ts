import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService){}

  searchByCountry (term: string): void{
    // Hay que suscribirse al Observable (.suscribe) para recibir los datos
    this.countriesService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries;
      })
  }
}
