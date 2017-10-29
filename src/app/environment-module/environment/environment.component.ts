import { Component, OnInit } from '@angular/core';
import { APIResponse } from '../../dto/apiResponse';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from '../environment.service';
import { Environment } from '../environment';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {

  form: FormGroup;

  codeMirrorConfig = {mode: {name: 'javascript', json: true}, lineNumbers: true, tabSize: 2};

  apiResponse: APIResponse;

  constructor(private environmentService: EnvironmentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  private createForm(environment: Environment) {
    this.form = new FormGroup({
      config: new FormControl(environment.config),
    });
  }

  ngOnInit(): void {
    this.environmentService.getEnvironment()
      .subscribe(item => this.createForm(item));
  }

  get environment(): Environment {
    return this.form.value;
  }

  onSubmit() {
    this.environmentService.updateEnvironment(this.environment)
      .subscribe(() => this.goBack(), (error) => {
        this.apiResponse = <APIResponse>error.json();
      });
  }

  goBack(): void {
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
