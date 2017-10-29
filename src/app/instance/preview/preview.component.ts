import { Component, Input, OnInit } from '@angular/core';
import { InstanceService } from '../instance.service';
import { Instance } from '../instance';
import { Preview } from '../preview';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() instance: Instance;
  preview: Preview;

  codeMirrorConfig = {mode: 'yaml', lineNumbers: true, tabSize: 2};

  constructor(private instanceService: InstanceService) {
  }

  ngOnInit() {
    this.instanceService.getPreview(this.instance.id)
      .subscribe(preview => this.preview = preview);
  }

}
