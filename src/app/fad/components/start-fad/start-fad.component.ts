import { Component, ViewChild } from '@angular/core';
import { FadServiceService } from '../../services/fad-service.service';
import { Router } from '@angular/router';
import { Fad } from '../../interfaces/fad';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from '../../../utils/constants-system';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { MmodalComponent } from '../../../shared/components/mmodal/mmodal.component';

@Component({
  selector: 'app-start-fad',
  templateUrl: './start-fad.component.html',
  styleUrls: ['./start-fad.component.css'],
})
export class StartFadComponent {
  @ViewChild('warningModal') warningModal!: ModalAlertsComponent;
  @ViewChild('fadModal') fadModal!: MmodalComponent;

  fad: any = [];
  fadM: any = [];
  api = '';

  classA: string = '';
  message: string = '';
  photoSelected: any;
  file!: File;

  user_id!: string;
  name!: string;
  description!: string;
  id: any;
  user_data: any = [];
  estado = -1;

  constructor(
    private fadService: FadServiceService,
    private router: Router,
    public constante: ConstantsSystem
  ) {}

  async ngOnInit() {
    this.api = this.constante.API_IMAGES;
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);
    await this.getAllsFad();

    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    if(this.id!=null){
      this.api = this.constante.API_IMAGES;
      await this.getAllsFad();
      await this.getMyFad();
    }else{
      this.router.navigate(['/inicio']);
    }
        
  }

  async getAllsFad() {
    this.fadService.getFads().subscribe((res) => {
      if (res != null) {
        this.fad = res.data;
      }
    });
  }

  async getMyFad() {
    this.fadService.getFadIdUser(this.id).subscribe((res) => {
      if (res != null) {
        this.fadM = res.data;
      }
    });
  }

  selectedFad(id: string) {
    this.router.navigate(['/commentFad', id]);
  }

  onValidate() {
    this.user_data.state.forEach((element: any, index: any) => {
      if (
        this.user_data.state[index] === 0 &&
        this.user_data.state.length === 1
      ) {
        this.estado = 0;
        this.warningModal.abrir();
      }
      if (
        this.user_data.state[index] === 1 ||
        this.user_data.state[index] !== 0
      ) {
        this.fadModal.abrir();
      }
    });
  }

  onRefresh(){
    location.reload();
  }

  onRedirigir() {
    this.router.navigate(['/dataUser', this.estado]);
  }
}