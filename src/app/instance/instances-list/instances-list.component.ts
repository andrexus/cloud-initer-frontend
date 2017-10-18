import { Component, OnInit } from '@angular/core';
import { Instance } from '../instance';
import { InstanceService } from '../instance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instances-list',
  templateUrl: './instances-list.component.html',
  styleUrls: ['./instances-list.component.css']
})
export class InstancesListComponent implements OnInit {

  instances: Instance[] = [];

  constructor(
    private instanceService: InstanceService,
    private router: Router) { }

  ngOnInit(): void {
    this.instanceService.getInstances()
      .subscribe(instances => this.instances = instances);
  }

  create(): void {
    this.router.navigate(['/instances/add']);
  }

  gotoDetail(instance: Instance): void {
    const link = ['/instances', instance.id];
    this.router.navigate(link);
  }

}
