import { Component } from '@angular/core';
import { FadServiceService } from '../../services/fad-service.service';
import { Router } from '@angular/router';
import { Fad } from '../../interfaces/fad';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-start-fad',
  templateUrl: './start-fad.component.html',
  styleUrls: ['./start-fad.component.css'],
})
export class StartFadComponent {
  fad: any;

  classA: string = '';
  message: string = '';
  photoSelected: any;
  file!: File;

  user_id!: string;
  name!: string;
  description!: string;
  id: any;

  constructor(private fadService: FadServiceService, private router: Router) {}

  async ngOnInit() {
    await this.getAllsFad();
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
  }

  async getAllsFad() {
    this.fadService.getFads().subscribe((res) => {
      if (res != null) {
        this.fad = res.data;
        console.log('fads', this.fad);
      }
    });
  }

  selectedFad(id: string) {
    this.router.navigate(['/commentFad', id]);
  }

  onChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const allowFiles = ['images/png'];
      const fi = event.target.files[0];
      const re = new FileReader();
      const readerBase64 = new FileReader();

      re.readAsArrayBuffer(fi);
      re.onload = (evt) => {
        const result = evt.target?.result as ArrayBuffer;
        const uInt = new Uint8Array(result.slice(0, 4));
        const bytes: string[] = [];
        uInt.forEach((val) => {
          bytes.push(val.toString(16));
        });
        const hexa = bytes.join('').toUpperCase();
        const filterFileTypes = allowFiles.filter(
          (val) => val === this.getImageType(hexa)
        );
        console.log(filterFileTypes);

        if (filterFileTypes.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => (this.photoSelected = reader.result);
          reader.readAsDataURL(this.file);
        } else {
          this.classA = 'alert-danger';
          this.message = 'Imagen no permitida';
          event.target.value = '';
          this.photoSelected = '';
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      };

      //image preview
    } else {
      console.log('seleccione una foto');
    }
  }

  getImageType(signature: string) {
    switch (signature) {
      case '89504E47':
        return 'images/png';
      default:
        return 'Unknown filetype';
    }
  }

  async onRegister(form: any) {
    try {
      this.description = form.value.description;
      this.name = form.value.name;
      const fd = new FormData();
      const resp = await lastValueFrom(
        this.fadService.register(
          this.id,
          form.value.name,
          form.value.description,
          this.file
        )
      );
      console.log('resp', resp);
      location.reload();
      this.classA = 'alert-success';
      this.message = resp.message;
      setTimeout(() => {
        this.router.navigate(['/fad']);
      }, 1500);
    } catch (error: any) {
      this.classA = 'alert-danger';
      this.message = error.error.message;
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  }
}
