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
  usuario: any;
  star = 0;
  rating: number = 0;
  id_star: string = '';
  band = 0;
  id: any;
  constructor(
    private fadService: FadServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem
  ) {}

  ngOnInit(): void {
    this.api = this.constante.API_IMAGES;

    if (sessionStorage.getItem('id')!) {
      this.id_user = sessionStorage.getItem('id')!;
    }
    if (this.id != null) {
      this.activatedRoute.params.subscribe(async (params) => {
        this.id_fad = params['id'];
        this.commentByIdFad();
        this.getStarUserId();
      });
      this.api = this.constante.API_IMAGES;
      this.getFadId();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  commentByIdFad() {
    this.fadService.getCommentByIdFad(this.id_fad).subscribe((res) => {
      if (res != null) {
        this.comment = res.data;
      }
    });
  }

  async getStarUserId() {
    const response = await lastValueFrom(
      this.fadService.getStartUserFadId(this.id_user, this.id_fad)
    );
    if (response !== null) {
      this.dataStar = response.data;
      this.star = this.dataStar[0].qualification;
      this.id_star = this.dataStar[0]._id;
      this.setRating(this.star);
      this.band = 1;
    } else {
      this.star = 0;
    }
  }

  getFadId() {
    this.fadService.getFadId(this.id_fad).subscribe((res) => {
      if (res != null) {
        this.fad = res.data;
        this.usuario = this.fad[0].user_id;

        console.log('fad', this.fad);
      }
    });
  }

  async onRegister(form: any) {
    try {
      form.value.user_id = this.id_user;
      await lastValueFrom(this.fadService.registerComment(form.value));
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async onRegisterStar(dataStar: any) {
    try {
      await lastValueFrom(this.fadService.registerRatingStar(dataStar));
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async onUpdateStar(id: string, dataStar: any) {
    try {
      await lastValueFrom(this.fadService.UpdateStar(id, dataStar));
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
      if (this.star === 0) {
        await this.onRegisterStar(this.dataStar);
      } else {
        await this.onUpdateStar(this.id_star, this.dataStar);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
