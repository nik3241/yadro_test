import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { IQuotes } from "../models/widget-currency-value.models"
import { Observable } from 'rxjs';

const data = {
  "quotes": {
    "USDAUD": 1.278342,
    "USDEUR": 1.278342,
    "USDGBP": 0.908019,
    "USDPLN": 3.731504
  },
  "source": "USD",
  "success": true,
  "timestamp": 1432400348
}

@Injectable({
  providedIn: 'root'
})
export class WidgetCurrencyValueService {
  dataQuotes!: IQuotes;
  APIkey = "7fuk7lQvRXyvUMhQvz3kGiXJ3K2StGXE";
  APIURL = "https://api.apilayer.com/currency_data/live";

  constructor(private http: HttpClient) {
    let dataQuotes1$ = this.getDataLive("RUB", ["USD", "EUR", "GBR"]);
    console.log(dataQuotes1$);

  }

  getDataLive(source: string, currencies: string[]): Observable<IQuotes> {


    let myParams = new HttpParams()
      .set("source", source)
      .set("currencies", currencies.toString().replaceAll(' ', ''));


    let myHeaders = new HttpHeaders()
      .set("apikey", this.APIkey,)
      .set("redirect", "follow",)
      .set("responseType", "json")

    // let reqDataLive: HttpRequest<HttpEvent<IQuotes>> =
    //   new HttpRequest("GET",
    //     this.APIURL, {
    //       headers: myHeaders,
    //       params:myParams
    //   });

    let requestOptions = {
      headers: myHeaders,
      params: myParams
    };

    console.log("requestOptions:", requestOptions);



    return this.http.request<IQuotes>(
      "GET",
      this.APIURL,
      requestOptions);
    // return this.http.request(reqDataLive)

  }

  setDataQuotes(data: IQuotes): void {
    this.dataQuotes = data;
  }
}
