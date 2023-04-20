import { Component } from '@angular/core';
import { FadServiceService } from '../../services/fad-service.service';
import { Router } from '@angular/router';
import { Fad } from '../../interfaces/fad';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';

@Component({
  selector: 'app-start-fad',
  templateUrl: './start-fad.component.html',
  styleUrls: ['./start-fad.component.css'],
})
export class StartFadComponent {
  fad: any = [];
  api = '';

  classA: string = '';
  message: string = '';
  photoSelected: any;
  file!: File;

  user_id!: string;
  name!: string;
  description!: string;
  id: any;

  constructor(
    private fadService: FadServiceService,
    private router: Router,
    public constante: ConstantsSystem
  ) {}

  async ngOnInit() {
    this.api = this.constante.API_IMAGES;
    await this.getAllsFad();

    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
  }

  async getAllsFad() {
    this.fadService.getFads().subscribe((res) => {
      if (res != null) {
        this.fad = res.data;
      }
    });
  }

  selectedFad(id: string) {
    this.router.navigate(['/commentFad', id]);
  }
}
