import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Environment } from './environment';

@Injectable()
export class EnvironmentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private environmentUrl = '/api/v1/environment';

  constructor(private http: Http) {
  }

  getEnvironment() {
    return this.http.get(this.environmentUrl).map(response =>  <Environment>response.json());
  }

  updateEnvironment(environment: Environment) {
    return this.http
      .put(this.environmentUrl, JSON.stringify(environment), {headers: this.headers})
      .map(response => environment);
  }

}
