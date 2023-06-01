import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css'],
})
export class SponsorComponent {
  copy = false;
  constructor(private clipboardService: ClipboardService) {}

  onCopy(text: string) {
    this.copy = true;
    this.clipboardService.copy(text);
  }
}
