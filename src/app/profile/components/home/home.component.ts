import { Component } from '@angular/core';
import { ProfileServiceService } from '../../services/profile-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faCircleCheck=faCircleCheck;
  faCircleXmark=faCircleXmark;
  user_data: any;
  api: string='';
  id: string='';
  token: any;
  dataUser: any;
  userGender: any=[];
gender:string='';
  
  constructor(
    private profileService: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
  ) {}

  ngOnInit(): void {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
     this.getUser();

      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getUser() {
    const resp = await lastValueFrom(this.profileService.getUserById(this.id));
      
    if (resp?.data.length > 0) {
      this.dataUser = resp.data[0];
      this.gender=this.dataUser.preferences;
      const resp1 = await lastValueFrom(this.profileService.getUserGender(this.gender));
      if (resp1?.data.length > 0) {
        this.userGender = resp1.data;
        console.log("users",this.userGender);
        }
      }
    }
  

}


