import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

require('codemirror/mode/yaml/yaml');

let CodeMirror = require('codemirror');

@Component({
  selector: 'codemirror',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodemirrorComponent),
    multi: true
  }],
  template: `<div #host></div>`,
})
export class CodemirrorComponent implements ControlValueAccessor {

  @Input()
  private config: any;

  @ViewChild('host')
  private host: any;

  private onChange: (_: any) => void;

  private onTouched: () => void;

  private instance: any;

  public writeValue(value: string) {
    let init = !this.instance;

    if (init) {
      this.instance = CodeMirror(this.host.nativeElement, this.config);
    }

    this.instance.setValue(value || '');

    if (init) {
      this.instance.on('change', () => {
        this.onChange(this.instance.getValue());
        this.onTouched();
      });
    }
  }

  public registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

}
