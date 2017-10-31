import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CloudInitData } from '../dto/cloud-init-data.dto';


@Injectable()
export class CloudInitService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  generatePreview(data: CloudInitData) {
    const url = `/api/v1/preview`;
    return this.http
      .post(url, JSON.stringify(data), {headers: this.headers})
      .map((response) =>  <CloudInitData>response.json());
  }

}
