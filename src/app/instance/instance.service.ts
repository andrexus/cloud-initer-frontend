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

  deleteItem(id: string) {
    const url = `${this.instancesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers}).map(() => null);
  }

  createItem(instance: Instance) {
    const url = `${this.instancesUrl}`;
    return this.http
      .post(url, JSON.stringify(instance), {headers: this.headers})
      .map(() => instance);
  }

  updateItem(instance: Instance) {
    const url = `${this.instancesUrl}/${instance.id}`;
    return this.http
      .put(url, JSON.stringify(instance), {headers: this.headers})
      .map(() => instance);
  }

  saveItem(instance: Instance) {
    return instance.id ? this.updateItem(instance) : this.createItem(instance);
  }

}
