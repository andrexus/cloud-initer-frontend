import { Component, OnInit } from '@angular/core';
import { Instance } from '../instance';
import { InstanceService } from '../instance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-instance-detail',
  templateUrl: './instance-detail.component.html',
  styleUrls: ['./instance-detail.component.css']
})
export class InstanceDetailComponent implements OnInit {

  form: FormGroup;
  private macAddressControl: FormControl;
  config = {mode: 'yaml', lineNumbers: true, tabSize: 2};

  constructor(private instanceService: InstanceService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  private createForm(instance: Instance) {
    this.form = new FormGroup({
      id:  new FormControl(instance.id),
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

  onSubmit() {
    const onSaved = this.instance.id ? this.instanceService.update(this.instance) : this.instanceService.create(this.instance);
    onSaved.subscribe(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  deleteInstance(instance: Instance): void {
    this.instanceService.delete(instance.id).subscribe(() => this.goBack());
  }

  generateMACAddress(): void {
    const macAddress = 'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
      return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    });

    this.macAddressControl.setValue(macAddress);
  }

}
