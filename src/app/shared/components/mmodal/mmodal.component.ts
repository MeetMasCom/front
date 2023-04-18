import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mmodal',
  templateUrl: './mmodal.component.html',
  styleUrls: ['./mmodal.component.scss']
})
export class MmodalComponent {
@Input() title='';
@ViewChild('modalBack') modalBack:any;
public show = false;

constructor(private renderer:Renderer2){

 this.renderer.listen('window','click',(e:Event)=>{
  if(this.modalBack && e.target ===this.modalBack.nativeElement){
    console.log('click');
    this.show=false;
  }
 })
}

showModal(){
  this.show=true;
}

hideModal(){
  this.show=false;
}

}
