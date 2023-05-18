import { Component } from '@angular/core';
import { BilleteraServiceService } from '../../service/billetera-service.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.component.html',
  styleUrls: ['./billetera.component.css']
})
export class BilleteraComponent {


  id:any;
  statusBilletera: number = -1;
billetera: any=[];
msj:string='';

  constructor(
    private router: Router,
    private billeteraService: BilleteraServiceService,
    public constante: ConstantsSystem,
    private http: HttpClient
  ) {}

   
  async ngOnInit() {
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    if (this.id != null) {
      this.getBilleteraUser();
    } else {
      this.router.navigate(['/inicio']);
    }
  }


  async getBilleteraUser(){
    const response = await lastValueFrom(this.billeteraService.getAllBilleteraUserId(this.id));
    if (response.data !== null) {
      this.billetera=response.data;
    }
  }

  async onCreateBilleteraBanco(form:any){
    form.value.alias = 'Banco';
    form.value.user_id = this.id;

    const response = await lastValueFrom(this.billeteraService.createBilletera(form.value));
    if (response.data !== null) {
      location.reload();
    }else{
      this.statusBilletera = 0;
    }
  }

 

}
