import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentComponent } from './environment/environment.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from '../codemirror/codemirror.module';
import { EnvironmentService } from './environment.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'environment', component: EnvironmentComponent},
    ]),
    CodemirrorModule,
  ],
  declarations: [EnvironmentComponent],
  providers: [ EnvironmentService ],
})
export class EnvironmentModule { }
