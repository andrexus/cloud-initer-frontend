import { Component, OnInit } from '@angular/core';
import { Instance } from '../instance';
import { InstanceService } from '../instance.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-instance-detail',
  templateUrl: './instance-detail.component.html',
  styleUrls: ['./instance-detail.component.css']
})
export class InstanceDetailComponent implements OnInit {

  instance: Instance;

  constructor(private instanceService: InstanceService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.instanceService.getInstance(id).subscribe(instance => this.instance = instance);
    } else {
      this.instance = new Instance();
    }
  }

  goBack(): void {
    this.location.back();
  }

  saveInstance(): void {
    if (this.instance.id) {
      this.instanceService.update(this.instance).subscribe(() => this.goBack());
    } else {
      this.instanceService.create(this.instance).subscribe(() => this.goBack());
    }
  }

  deleteInstance(instance: Instance): void {
    this.instanceService.delete(instance.id).subscribe(() => this.goBack());
  }

  generateMACAddress(): void {
    this.instance.macAddress = 'XX:XX:XX:XX:XX:XX'.replace(/X/g, function() {
      return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    });
  }

}
