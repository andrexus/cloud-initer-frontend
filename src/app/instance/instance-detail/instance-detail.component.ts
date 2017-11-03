import { Component, OnInit } from '@angular/core';
import { Instance } from '../instance';
import { InstanceService } from '../instance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { APIResponse } from '../../dto/api-response.dto';


@Component({
  selector: 'app-instance-detail',
  templateUrl: './instance-detail.component.html',
  styleUrls: ['./instance-detail.component.css']
})
export class InstanceDetailComponent implements OnInit {

  form: FormGroup;

  private macAddressControl: FormControl;

  codeMirrorConfig = {mode: 'yaml', lineNumbers: true, tabSize: 2};

  apiResponse: APIResponse;

  isPreview = false;

  constructor(private instanceService: InstanceService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  private createForm(instance: Instance) {
    this.form = new FormGroup({
      id: new FormControl(instance.id),
      name: new FormControl(instance.name),
      ipAddress: new FormControl(instance.ipAddress),
      macAddress: this.macAddressControl = new FormControl(instance.macAddress),
      metaData: new FormControl(instance.metaData),
      userData: new FormControl(instance.userData),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const onReceived = id ? this.instanceService.getInstance(id) : Observable.of(new Instance());

    onReceived.subscribe(instance => this.createForm(instance));
  }

  get instance(): Instance {
    return this.form.value;
  }

  saveInstance() {
    this.instanceService.saveItem(this.instance).subscribe(
      () => this.goBack(),
      (error) => this.apiResponse = <APIResponse>error.json()
    );
  }

  deleteInstance(instance: Instance): void {
    this.instanceService.deleteItem(instance.id).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  generateMACAddress(): void {
    const macAddress = 'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
      return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    });

    this.macAddressControl.setValue(macAddress);
  }

}
