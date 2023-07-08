import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


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
  @Input() photoSelect: string = '';
  @Input() services: any = [];
  @Input() room: any;
  @Input() photo: any;
  @Input() price: any;
  @Input() service: any;
  @Input() hotel: any;
  @Input() typeRoom: any;
  @Input() policies: any;
  @Input() post: any = [];
  @Input() user: any = [];
  @Input() profile: any = [];
  @Input() entradas: any = [];
  @Input() notification: any = [];
  @Input() estado: any;
  @Input() userV: any = [];
  @Input() detalle: any = [];
  @Input() detalleA: any = [];
  @Input() star:number=0;
  @Input() id:any;
  @Input() statusUserName: boolean=false;
  @Input() usuarios: number=0;
  @Input() promedio: number=0;


  
  faShield = faShield;
  faFile = faFile;

  @Output() successModal: EventEmitter<any> = new EventEmitter();
  @Output() sendModal: EventEmitter<any> = new EventEmitter();
  @Output() onChangeModal: EventEmitter<any> = new EventEmitter();
  @Output() selectPhoto: EventEmitter<any> = new EventEmitter();
  @Output() onSelectCheck: EventEmitter<any> = new EventEmitter();
  @Output() onSelectDoc: EventEmitter<any> = new EventEmitter();
  @Output() onPrice: EventEmitter<any> = new EventEmitter();
  @Output() onSelectPrice: EventEmitter<any> = new EventEmitter();
  @Output() onValidateHotel: EventEmitter<any> = new EventEmitter();
  @Output() onDeclineHotel: EventEmitter<any> = new EventEmitter();
  @Output() onCommentDecline: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateHotel: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadDoc: EventEmitter<any> = new EventEmitter();
  @Output() onVPolicies: EventEmitter<any> = new EventEmitter();
  @Output() onRegisterPolicies: EventEmitter<any> = new EventEmitter();
  @Output() onAprobatePolicies: EventEmitter<any> = new EventEmitter();
  @Output() onCommentPolicies: EventEmitter<any> = new EventEmitter();
  @Output() onDeclinePolicies: EventEmitter<any> = new EventEmitter();
  @Output() onUpdatePolicies: EventEmitter<any> = new EventEmitter();
  @Output() PostModal: EventEmitter<any> = new EventEmitter();
  @Output() onChangeImagen: EventEmitter<any> = new EventEmitter();
  @Output() AddProfile: EventEmitter<any> = new EventEmitter();
  @Output() AddSocialN: EventEmitter<any> = new EventEmitter();
  @Output() changeRadio: EventEmitter<any> = new EventEmitter();
  @Output() onVerifyUser: EventEmitter<any> = new EventEmitter();
  @Output() onRegisterMessage: EventEmitter<any> = new EventEmitter();
  @Output() onUpdatePackage: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateAdmin: EventEmitter<any> = new EventEmitter();
  @Output() onDeclineAds: EventEmitter<any> = new EventEmitter();
  @Output() onValidateAds: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateProfile: EventEmitter<any> = new EventEmitter();
  @Output() onSetRating: EventEmitter<any> = new EventEmitter();
  @Output() onStarQualification: EventEmitter<any> = new EventEmitter();
  @Output() onValidateUserName: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalPublicar') modalPublicar!: ElementRef;
  @ViewChild('modalService') modalService!: ModalAlertsComponent;

  message: string = '';
  api = '';
  rating: number=0;
  dataStar: any=[]
  constructor(public constante: ConstantsSystem,
    library: FaIconLibrary) {
      library.addIconPacks(fas, far, fab);
    }
    
  async ngOnInit() {
    this.api = this.constante.API_IMAGES;
  }

  abrir() {
    this.modalPublicar.nativeElement.click();
  }

  onSuccess() {
    this.successModal.emit();
  }

  onRecover(form: any) {
    this.sendModal.emit(form);
  }

  onChange(event: any) {
    this.onChangeModal.emit(event);
  }

  selectCheck(event: any) {
    this.onSelectCheck.emit(event);
  }

  onFileSelected(event: any) {
    this.onSelectDoc.emit(event);
  }

  registerPrice(event: any) {
    this.onPrice.emit(event);
  }

  selectPrice(event: any) {
    this.onSelectPrice.emit(event);
  }

  onValidateH(event: any) {
    this.onValidateHotel.emit(event);
  }

  onDeclineH(event: any) {
    this.onDeclineHotel.emit(event);
  }

  onDownload(event: any) {
    this.onDownloadDoc.emit(event);
  }

  onCommentH(event: any) {
    this.onCommentDecline.emit(event);
  }

  UpdateHotel(event: any) {
    this.onUpdateHotel.emit(event);
  }

  aprobarP(event: any) {
    this.onAprobatePolicies.emit(event);
  }

  commentPolicies(event: any) {
    this.onCommentPolicies.emit(event);
  }

  vPoliticas(event: any) {
    this.onVPolicies.emit(event);
  }

  registerPolicies(event: any) {
    this.onRegisterPolicies.emit(event);
  }

  onCommentP(event: any) {
    this.onDeclinePolicies.emit(event);
  }

  onUpdateP(event: any) {
    this.onUpdatePolicies.emit(event);
  }

  onPost(form: any) {
    this.PostModal.emit(form);
  }

  onChangeI(event: any) {
    this.onChangeImagen.emit(event);
  }

  addProfile(event:any){
    this.AddProfile.emit(event);
  }

  onAddSocial(form: any){
    this.AddSocialN.emit(form);
  }

  onRadioChange(event:any){
    this.changeRadio.emit(event);
  }

  VerifyUser(event:any){
    this.onVerifyUser.emit(event);
  }


  registerMessage(event:any){
    this.onRegisterMessage.emit(event);
  }

  updatePackage(event:any){
    this.onUpdatePackage.emit(event);
  }

  updateAdmin(event:any){
    this.onUpdateAdmin.emit(event);
  }

  rechazarAds(event:any){
    this.onDeclineAds.emit(event);
  }

  ValidateAds(event:any){
  this.onValidateAds.emit(event);
  }


  updateProfile(event:any){
      this.onUpdateProfile.emit(event);
  }

  validateUserName(event:any){
    this.onValidateUserName.emit(event);
  }
  async setRating(val: number) {
    try {
      this.rating = val;
      this.dataStar = {
        post_id: this.post._id,
        qualification: this.rating,
      };

      this.onStarQualification.emit(this.dataStar);
      // if (this.star === 0) {
      //   await this.onRegisterStar(this.dataStar);
      // } else {
      //   await this.onUpdateStar(this.id, this.dataStar);
      // }
    } catch (error) {
      console.log(error);
    }
  }
}
