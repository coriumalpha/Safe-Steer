import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-truncated-text',
  templateUrl: './truncated-text.component.html',
  styleUrls: ['./truncated-text.component.css']
})
export class TruncatedTextComponent implements OnInit {
  @Input() text: string = '';
  @Input() maxLength: number = 0;
  public displayText: string = '';

  ngOnInit() {
    if (this.text.length > this.maxLength) {
      this.displayText = this.text.substr(0, this.maxLength) + '...';
    } else {
      this.displayText = this.text;
    }
  }
}