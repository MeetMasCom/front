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

  constructor() {
    /*Constructor*/
  }

  async ngOnInit() {
    /*funciones al inciar*/
  }

  async onDelete(id: string) {
    this.sendId.emit(id);
  }

  async onUpdate(item: any) {
    this.sendItem.emit(item);
  }
}
