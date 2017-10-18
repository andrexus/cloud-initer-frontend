import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstanceService } from './instance.service';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';
import { InstancesListComponent } from './instances-list/instances-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'instances', component: InstancesListComponent},
      {path: 'instances/add', component: InstanceDetailComponent},
      {path: 'instances/:id', component: InstanceDetailComponent}
    ])
  ],
  declarations: [
    InstancesListComponent,
    InstanceDetailComponent,
  ],
  providers: [ InstanceService ],
})
export class InstanceModule { }
