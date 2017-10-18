import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Instance } from './instance';


@Injectable()
export class InstanceService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private instancesUrl = '/api/v1/instances';

  constructor(private http: Http) {
  }

  getInstances() {
    return this.http.get(this.instancesUrl).map(response => <Instance[]>response.json().items);
  }


  getInstance(id: string) {
    const url = `${this.instancesUrl}/${id}`;

    return this.http.get(url).map(response => <Instance>response.json());
  }

  delete(id: string) {
    const url = `${this.instancesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers}).map(() => null);
  }

  create(instance: Instance) {
    const url = `${this.instancesUrl}`;
    return this.http
      .post(url, JSON.stringify(instance), {headers: this.headers})
      .map(() => instance);
  }

  update(instance: Instance) {
    const url = `${this.instancesUrl}/${instance.id}`;
    return this.http
      .put(url, JSON.stringify(instance), {headers: this.headers})
      .map(() => instance);
  }

}
