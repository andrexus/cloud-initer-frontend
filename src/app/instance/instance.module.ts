import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstanceService } from './instance.service';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';
import { InstancesListComponent } from './instances-list/instances-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CodemirrorModule } from '../codemirror/codemirror.module';
import { PreviewComponent } from './preview/preview.component';
import { CloudInitService } from './cloud-init.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'instances', component: InstancesListComponent},
      {path: 'instances/add', component: InstanceDetailComponent},
      {path: 'instances/:id', component: InstanceDetailComponent}
    ]),
    CodemirrorModule,
  ],
  declarations: [
    InstancesListComponent,
    InstanceDetailComponent,
    PreviewComponent,
  ],
  providers: [ InstanceService, CloudInitService ],
})
export class InstanceModule { }
