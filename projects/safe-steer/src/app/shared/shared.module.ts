import { NgModule } from '@angular/core';
import { TruncatedTextComponent } from './truncated-text/truncated-text.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TruncatedTextComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TruncatedTextComponent
  ]
})
export class SharedModule { }
