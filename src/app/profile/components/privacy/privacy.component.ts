import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProfileServiceService } from '../../services/profile-service.service';
import { FriendsServiceService } from '../../../friends/services/friends-service.service';
import { UserServiceService } from '../../../user/services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user';
import { lastValueFrom, share } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})
export class PrivacyComponent {
  api: string = '';
  id: string = '';
  spam: any;
  statusUserName: boolean = false;
  userSpam: any;
  idSpam: any;

  constructor(
    private profileService: ProfileServiceService,
    private friendsService: FriendsServiceService,
    private userService: UserServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getSpamUser();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getSpamUser() {
    const resp = await lastValueFrom(this.profileService.getSpamUser(this.id));

    if (resp?.data.length > 0) {
      this.spam = resp.data;
    }
  }

  async onValidateUserName(param: string) {
    try {
      const response = await lastValueFrom(
        this.profileService.validateUserEmail(param)
      );
      if (response.data !== null) {
        this.userSpam = response.data;

        this.idSpam = this.userSpam._id;
        this.statusUserName = false;
      } else {
        this.statusUserName = true;
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }


  async onRegisterSpam(form: any) {
    try {
      const resp = await lastValueFrom(
        this.profileService.registerSpam(this.id, form, this.idSpam)
      );
      if (resp.data!== null) {
        this.router.navigate(['/privacy']);
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }
}
