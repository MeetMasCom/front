import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild} from '@angular/core';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { faShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mmodal',
  templateUrl: './mmodal.component.html',
  styleUrls: ['./mmodal.component.css'],
})
export class MmodalComponent {
  @Input() idModal: string = '';
  @Input() title = '';
  @Input() icono: string = '';
  @Input() titulo: string = '';
  @Input() tipo = -1;
  @Input() descripcion: string = '';
  @Input() val: string = '';
  @Input() photoSelected: string = '';
  @Input() services: any = [];
  @Input() room:any;  
  @Input() photo: any;
  @Input() service: any ;

  faShield = faShield;

  @Output() successModal: EventEmitter<any> = new EventEmitter();
  @Output() sendModal: EventEmitter<any> = new EventEmitter();
  @Output() onChangeModal: EventEmitter<any> = new EventEmitter();
  @Output() selectPhoto: EventEmitter<any> = new EventEmitter();
  @Output() onSelectCheck: EventEmitter<any> = new EventEmitter();
  @Output() onSelectDoc: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalPublicar') modalPublicar!: ElementRef;
  @ViewChild('modalService') modalService!: ModalAlertsComponent;

  message: string='';
  api = '';
  constructor(public constante: ConstantsSystem
  ) {}
  async ngOnInit() {
  this.api = this.constante.API_IMAGES;
  
  }

  abrir() {
    this.modalPublicar.nativeElement.click();
    //console.log("imagen",this.photo);
      console.log("room",this.room);
  console.log("servicio modal",this.service[0].description);
  }

  onSuccess() {
    this.successModal.emit();
  }

  onRecover(form: any) {
    this.sendModal.emit(form);
  }

  onChange(event:any){
    this.onChangeModal.emit(event);
  }

  selectCheck(event:any){
    this.onSelectCheck.emit(event);
  }

  onFileSelected(event:any){
    this.onSelectDoc.emit(event);
  }

}