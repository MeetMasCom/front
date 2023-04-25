import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FadServiceService } from '../../services/fad-service.service';
import { Router } from '@angular/router';
import { Coment } from '../../interfaces/comment';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  api = '';
  dataStar: any;
  fad: any;
  comment: any;
  id_user: any;
  id_fad: any;
  user: any;
  currentRate = 0;
  usuario:any;
  star=0;
  rating: number = 0;
  id_star:string='';
  band=0;
  constructor(
    private fadService: FadServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;
    this.activatedRoute.params.subscribe((params) => {
      this.id_fad = params['id'];
      this.fadService.getFadId(this.id_fad).subscribe((res) => {
        if (res != null) {
          this.fad = JSON.parse(res.data);
          this.usuario=this.fad.user_id;
         
          console.log('fad', this.fad);
        }
      });

      this.fadService.getCommentByIdFad(this.id_fad).subscribe((res) => {
        if (res != null) {
          this.comment = res.data;
          console.log('comment', this.comment);
        }
      });
      if (sessionStorage.getItem('id')!) {
        this.id_user = sessionStorage.getItem('id')!;
      }
      this.fadService.getStartUserFadId(this.id_user, this.id_fad).subscribe(res => {
        if (res != null) {
          this.dataStar=JSON.parse(res.data);
          this.star=this.dataStar.qualification;
          this.id_star=this.dataStar._id;
          this.setRating(this.star);
          this.band=1;
          console.log("estrellas",res);
        }else{
          this.star=0;
        }
          
      })
      
    });
    
  }

  async onRegister(form: any) {
    try {
      form.value.user_id = this.id_user;
      const resp = await lastValueFrom(
        this.fadService.registerComment(form.value)
      );
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }


  async onRegisterStar(dataStar:any) {
    try {
      const resp = await lastValueFrom(
        this.fadService.registerRatingStar(dataStar)
      );
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  
  async onUpdateStar(id:string,dataStar:any) {
    try {
      const resp = await lastValueFrom(
        this.fadService.UpdateStar(id,dataStar)
      );
      //location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async setRating(val: number) {
    try {
      this.rating = val;      
      this.dataStar = {
        user_id: this.id_user,
        fad_id: this.id_fad,
        qualification: this.rating,
      };
      if(this.star===0){
          this.onRegisterStar(this.dataStar)
      }else{
      this.onUpdateStar(this.id_star,this.dataStar);
      }
    
    } catch (error) {
      console.log(error);
    }
  }
}
