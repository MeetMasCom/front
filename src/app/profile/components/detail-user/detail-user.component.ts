import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent {
  @Input() estado: any = [];
  @Input() user: any = [];


  async ngOnInit() {
    console.log("estado",this.estado);
    console.log("usuario",this.user);
  }
}
