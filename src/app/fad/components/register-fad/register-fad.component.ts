import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FadServiceService} from '../../services/fad-service.service';
import { lastValueFrom } from 'rxjs';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-register-fad',
  templateUrl: './register-fad.component.html',
  styleUrls: ['./register-fad.component.css']
})
export class RegisterFadComponent {

  classA: string = '';
  message: string = '';
  photoSelected: any;
  file!: File;

  user_id!: string;
  name!: string;
  description!: string;
 id:any;


  constructor(private fadService: FadServiceService, private router: Router) { }
  ngOnInit(): void {

    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }

  }

  
  onChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const allowFiles=['images/png'];
      const fi=event.target.files[0];
      const re =new FileReader();
      const readerBase64=new FileReader();

      re.readAsArrayBuffer(fi);
      re.onload=(evt)=>{
        const result=evt.target?.result as ArrayBuffer;
        const uInt=new Uint8Array(result.slice(0,4));
        const bytes: string[]=[];
        uInt.forEach(val =>{
          bytes.push(val.toString(16));
        });
        const hexa=bytes.join('').toUpperCase();
        const filterFileTypes=allowFiles.filter(val =>val === this.getImageType(hexa));
        console.log(filterFileTypes);
       
        if(filterFileTypes.length>0){
         
          const reader = new FileReader();
          reader.onload = e => this.photoSelected = reader.result;
          reader.readAsDataURL(this.file);

        }else{
          this.classA = 'alert-danger';
          this.message = "Imagen no permitida";
          event.target.value='';
          this.photoSelected='';
          setTimeout(()=>{           
            location.reload();
          },1500)
         
        }
     
      }

      //image preview
      
      
    }
    else{
      console.log("seleccione una foto");
    }
    
  }

getImageType(signature: string){
  switch(signature){    
    case '89504E47':
      return 'images/png';
    default:
      return 'Unknown filetype'
  }
}


  async onRegister(form: any) {
      try {       
               
                
      } catch (error: any) {
       
      }
  }
 

}
