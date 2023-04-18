import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FadServiceService } from '../../services/fad-service.service';
import { Router } from '@angular/router';
import { Coment } from '../../interfaces/comment'
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  dataStar: any;
  fad: any;
  comment: any;
  id_user: any;
  id_fad: any;
  user: any;
  currentRate = 0;

  rating: number = 0;
  constructor(
    private fadService: FadServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id_fad = params['id'];
      this.fadService.getFadId(this.id_fad).subscribe(res => {
        if (res != null) {
          this.fad = res.data;
          console.log("fad", this.fad);
        }

      });

      this.fadService.getCommentByIdFad(this.id_fad).subscribe(res => {
        if (res != null) {
          this.comment = res.data;
          console.log("comment", this.comment);
        }

      });
      if (sessionStorage.getItem('id')!) {
        this.id_user = sessionStorage.getItem('id')!;
      }
      /*this.fadService.getStartUserFadId(this.id_user, this.id_fad).subscribe(res => {
        if (res != null) {
          console.log("estrellas", res.data[0].qualification);
          this.setRating(res.data[0].qualification);
        }

      });*/


    })

  }

  async onRegister(form: any) {
    try {
      form.value.user_id = this.id_user;
      const resp = await lastValueFrom(this.fadService.registerComment(form.value));
      console.log('resp', resp);
      location.reload();
    } catch (error) {
      console.log(error);
    }

  }

  async setRating(val: number) {
    try {
      this.rating = val;
      const star = new FormData;
      this.dataStar = ({
        user_id: this.id_user,
        fad_id: this.id_fad,
        qualification: this.rating
      });
      const resp = await lastValueFrom(this.fadService.registerRatingStar(this.dataStar));
      console.log('resp', resp);
    } catch (error) {
      console.log(error);
    }
  }



}
