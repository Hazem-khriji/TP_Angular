import { Component, signal, computed, linkedSignal } from '@angular/core';
import { countries } from '../data/countries';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-country-currency-selector',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './country-currency-selector.component.html',
  styleUrl: './country-currency-selector.component.css',
})
export class CountryCurrencySelectorComponent {
  countries = signal(countries);

  selectedCountryName = signal(countries[0].name);
    selectedCountry = computed(
    () => this.countries().find((country) => country.name === this.selectedCountryName())!,
  );

  currencies = computed(() => this.selectedCountry().acceptedCurrencies);

  selectedCurrency = linkedSignal<string[], string>({
    source: this.currencies,
    computation: (newCurrencies, previous) =>
      previous && newCurrencies.includes(previous.value)
        ? previous.value
        : newCurrencies[0],
  });

}
