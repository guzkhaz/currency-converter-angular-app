import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class CurrencyConvertService {

  private apiKey = 'c12b9cd5713b555dd2775549';
  private apiUrl = 'https://v6.exchangerate-api.com/v6/';

  constructor(public http: HttpClient) {}

  public getLatestRates(baseCurrency : string): Observable <any> {
    return this.http.get(`${this.apiUrl}${this.apiKey}/latest/${baseCurrency}`);
  }
}
