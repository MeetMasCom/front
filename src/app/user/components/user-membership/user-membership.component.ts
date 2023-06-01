import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-membership',
  templateUrl: './user-membership.component.html',
  styleUrls: ['./user-membership.component.css'],
})
export class UserMembershipComponent implements OnInit {
  membresias: any = [];
  user: any;

  constructor(private userService: UserServiceService) {}

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('data')!);
    await this.getMembership();
  }

  async getMembership() {
    try {
      const response = await lastValueFrom(this.userService.getAllMembership());

      if (response.data.length > 0) {
        response.data.map((item: any) => {
          if (item.state) {
            this.membresias.push(item);
          }
        });
      }
    } catch (error: any) {
      this.membresias = [];
    }
  }
}
