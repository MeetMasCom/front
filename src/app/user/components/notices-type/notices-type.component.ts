import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdsI } from 'src/app/shared/interfaces/ad.interface';

@Component({
  selector: 'app-notices-type',
  templateUrl: './notices-type.component.html',
  styleUrls: ['./notices-type.component.css'],
})
export class NoticesTypeComponent implements OnInit {
  @Input() type = -1;
  @Input() data: AdsI[] = [];
  @Output() sendId: EventEmitter<any> = new EventEmitter();
  @Output() sendItem: EventEmitter<any> = new EventEmitter();
  @Output() onOffItem: EventEmitter<AdsI> = new EventEmitter();

  constructor() {
    /*Constructor*/
  }

  ngOnInit() {
    /*funciones al inciar*/
  }

  onDelete(id: string) {
    this.sendId.emit(id);
  }

  onUpdate(item: AdsI) {
    this.sendItem.emit(item);
  }

  onOffAds(item: AdsI) {
    this.onOffItem.emit(item);
  }
}
