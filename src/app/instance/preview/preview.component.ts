import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CloudInitData } from '../../dto/cloud-init-data.dto';
import { CloudInitService } from '../cloud-init.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() userData: string;
  @Input() metaData: string;

  cloudInitData: CloudInitData;

  previewUserDataFormControl: FormControl;
  previewMetaDataFormControl: FormControl;

  codeMirrorConfig = {mode: 'yaml', lineNumbers: true, tabSize: 2, readOnly: 'nocursor' };

  constructor(private cloudInitService: CloudInitService) {
  }

  ngOnInit() {
    const requestData = {
      userData: this.userData,
      metaData: this.metaData,
    };
    this.cloudInitService.generatePreview(requestData)
      .subscribe(data => {
        this.cloudInitData = data;
        this.previewUserDataFormControl = new FormControl(this.cloudInitData.userData);
        this.previewMetaDataFormControl = new FormControl(this.cloudInitData.metaData);
      });
  }

}
