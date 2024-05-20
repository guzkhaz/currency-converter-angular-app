import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { currencies } from './currencyCode';
import { CurrencyConvertService } from "../services/converter-api.service"

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  public form: FormGroup;
  public currencies = currencies;
  public result = '';
  public conversionRates: any;
  constructor(private fb: FormBuilder, private currencyConvertService: CurrencyConvertService) {
    this.form = this.fb.group({
      amount: [100, [Validators.required]],
      fromSelect: [currencies[0], [Validators.required]],
      toSelect: [currencies[0], [Validators.required]],
    });
  }

  submit() {
    const formValue = this.form.value;
    const fromSelect = this.conversionRates[formValue.fromSelect];
    const toSelect = this.conversionRates[formValue.toSelect];
    const convertedAmount = (formValue.amount / fromSelect) * toSelect;
    this.result = `${formValue.amount} ${formValue.fromSelect} = ${convertedAmount.toFixed(2)} ${formValue.toSelect}`;
  }

  ngOnInit(): void {
    this.currencyConvertService.getLatestRates('USD').subscribe(
      (response) => {
        this.conversionRates = response.conversion_rates;
      },
      (error) => {
        console.error('Ошибка при получении курсов валют:', error);
      }
    );
  }
}
