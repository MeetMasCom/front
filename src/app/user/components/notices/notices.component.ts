import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { AdminServiceService } from '../../../admin/services/admin-service.service';
import { lastValueFrom } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { LayoutServiceService } from 'src/app/layouts/services/layout-service.service';
import { AdsI } from 'src/app/shared/interfaces/ad.interface';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css'],
})
export class NoticesComponent implements OnInit, OnChanges {

  @Input() action: number = 0 // 0 - nuevo, 1 - revision 2 - edicion
  @Input() data!: AdsI
  @Output() saveAds = new EventEmitter<any>();
  @Output() acceptAds = new EventEmitter<AdsI>();
  @Output() rejectAds = new EventEmitter<AdsI>();

  selectedImage!: any
  form = new FormGroup({});
  model: any = {};
  fieldsTipo: FormlyFieldConfig[] = [
    {
      key: 'package',
      type: 'select',
      props: {
        label: 'Paquete Visitas',
        placeholder: 'Seleccione una opción',
        required: true,
        options: [

        ]
      },
    },
    {
      key: 'type',
      type: 'select',
      props: {
        label: 'Tipo',
        placeholder: 'Seleccione una opción',
        required: true,
        options: [
          { value: 1, label: 'Página externa' },
          { value: 2, label: 'Perfil' },
          { value: 3, label: 'Páginas de web' },
        ]
      },
    },
  ]
  fieldsTipo1: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Título',
        placeholder: 'Título',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'textarea',
      props: {
        label: 'Descripción',
        placeholder: 'Descripción',
        rows: 4,
        required: true,
      },
    },
    {
      key: 'link',
      type: 'input',
      props: {
        label: 'Enlace',
        placeholder: 'Enlace',
        required: true,
      },
      validators: {
        validation: ['url'],
      },
    }
  ]
  fieldsTipo3: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Título',
        placeholder: 'Título',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'textarea',
      props: {
        label: 'Descripción',
        placeholder: 'Descripción',
        rows: 4,
        required: true,
      },
    },
    {
      key: 'link',
      type: 'select',
      props: {
        label: 'Página',
        placeholder: 'Seleccione una opción',
        required: true,
        options: [

        ]
      },
    }
  ]
  fieldsGeneral: FormlyFieldConfig[] = [
    {
      key: 'age',
      type: 'select',
      props: {
        label: 'Edad',
        placeholder: 'Seleccione una opción',
        required: true,
        multiple: true,
        selectAllOption: 'Seleccionar todos',
        options: [

        ]
      },
    },
    {
      key: 'carrer',
      type: 'select',
      props: {
        label: 'Profesión',
        placeholder: 'Seleccione una opción',
        required: true,
        multiple: true,
        selectAllOption: 'Seleccionar todos',
        options: [

        ]
      },
    },
    {
      key: 'country',
      type: 'select',
      props: {
        label: 'País',
        placeholder: 'Seleccione una opción',
        required: true,
        multiple: true,
        selectAllOption: 'Seleccionar todos',
        options: [

        ]
      },
    },
    {
      key: 'language',
      type: 'select',
      props: {
        label: 'Idioma',
        placeholder: 'Seleccione una opción',
        required: true,
        multiple: true,
        selectAllOption: 'Seleccionar todos',
        options: [

        ]
      },
    },
    {
      key: 'hobbies',
      type: 'select',
      props: {
        label: 'Pasatiempos',
        placeholder: 'Seleccione una opción',
        required: true,
        multiple: true,
        selectAllOption: 'Seleccionar todos',
        options: [

        ]
      },
    },
    {
      key: 'gender',
      type: 'select',
      props: {
        label: 'Genero',
        placeholder: 'Seleccione una opción',
        required: true,
        multiple: true,
        selectAllOption: 'Seleccionar todos',
        options: [

        ]
      },
    },
    {
      key: 'religion',
      type: 'select',
      props: {
        label: 'Religión',
        placeholder: 'Seleccione una opción',
        required: true,
        multiple: true,
        selectAllOption: 'Seleccionar todos',
        options: [

        ]
      },
    },
    {
      key: 'journal',
      type: 'select',
      props: {
        label: 'Jornada Laboral',
        placeholder: 'Seleccione una opción',
        required: true,
        multiple: true,
        selectAllOption: 'Seleccionar todos',
        options: [

        ]
      },
    },
    {
      key: 'dependency',
      type: 'select',
      props: {
        label: 'Tipo de Dependencia',
        placeholder: 'Seleccione una opción',
        required: true,
        multiple: true,
        selectAllOption: 'Seleccionar todos',
        options: [

        ]
      },
    }
  ]
  fieldsReview: FormlyFieldConfig[] = [
    {
      key: 'comentary',
      type: 'textarea',
      props: {
        label: 'Observación',
        placeholder: 'Observación',
        rows: 5
      },
    }
  ]
  userId!: string;
  ageList: any[] = [];
  jobs: any[] = [];
  languageList: any[] = [];
  hobbiesList: any[] = [];
  religionList: any[] = [];
  journalList: any[] = [];
  dependecyList: any[] = [];
  genders: any[] = [];
  countries: any[] = [];
  allPackage: any[] = [];
  errMsj: string = "";
  images: any[] = [];
  pages: any[] = [];

  constructor(private userService: UserServiceService, private adminService: AdminServiceService, private toastrService: ToastrService, private layoutServiceService: LayoutServiceService) { }


  ngOnInit() {
    this.userId = sessionStorage.getItem('id')!;
    this.getPackageAds();
    this.getJobs();
    this.onGetCountry();
    this.getGenero();
    this.getAges();
    this.getLanguages();
    this.getHobbies();
    this.getReligion();
    this.getJournals();
    this.getDependency();
    this.getPhotoUser();
    this.getPageUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.action == 2) {
      if (this.data) delete this.data.comentary;
      this.disableAllForm();
    }
  }

  disableAllForm() {
    this.fieldsTipo.forEach(item => {
      item.props!.disabled = true;
    })
    this.fieldsTipo1.forEach(item => {
      item.props!.disabled = true;
    })
    this.fieldsTipo3.forEach(item => {
      item.props!.disabled = true;
    })
    this.fieldsGeneral.forEach(item => {
      item.props!.disabled = true;
    })
  }

  async getPhotoUser() {
    // try {
    //   const response = await lastValueFrom(
    //     this.userService.getCatalog('AGE')
    //   );
    //   response.data.map((x: any) => {
    //     this.ageList.push({
    //       item_id: x._id,
    //       item_text: x.name,
    //     });
    //   });
    //   this.fieldsGeneral.find(f => f.key == 'age')!.props!.options = this.ageList.map((f: any) => {
    //     return {
    //       label: f.item_text,
    //       value: f.item_id
    //     }
    //   })
    // } catch (error: any) {
    //   this.ageList = [];
    // }
  }

  async getPageUser() {
    // try {
    //   const response = await lastValueFrom(
    //     this.userService.getCatalog('AGE')
    //   );
    //   response.data.map((x: any) => {
    //     this.pages.push({
    //       item_id: x._id,
    //       item_text: x.name,
    //     });
    //   });
    //   this.fieldsTipo3.find(f => f.key == 'link')!.props!.options = this.pages.map((f: any) => {
    //     return {
    //       label: f.item_text,
    //       value: f.item_id
    //     }
    //   })
    // } catch (error: any) {
    //   this.pages = [];
    // }
  }

  async getAges() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('AGE')
      );
      response.data.map((x: any) => {
        this.ageList.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
      this.fieldsGeneral.find(f => f.key == 'age')!.props!.options = this.ageList.map((f: any) => {
        return {
          label: f.item_text,
          value: f.item_id
        }
      })
    } catch (error: any) {
      this.ageList = [];
    }
  }

  async getLanguages() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('LANGUAGE')
      );
      response.data.map((x: any) => {
        this.languageList.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
      this.fieldsGeneral.find(f => f.key == 'language')!.props!.options = this.languageList.map((f: any) => {
        return {
          label: f.item_text,
          value: f.item_id
        }
      })
    } catch (error: any) {
      this.languageList = [];
    }
  }

  async getHobbies() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('HOBBIES')
      );
      response.data.map((x: any) => {
        this.hobbiesList.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
      this.fieldsGeneral.find(f => f.key == 'hobbies')!.props!.options = this.hobbiesList.map((f: any) => {
        return {
          label: f.item_text,
          value: f.item_id
        }
      })
    } catch (error: any) {
      this.hobbiesList = [];
    }
  }

  async getReligion() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('RELIGION')
      );
      response.data.map((x: any) => {
        this.religionList.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
      this.fieldsGeneral.find(f => f.key == 'religion')!.props!.options = this.religionList.map((f: any) => {
        return {
          label: f.item_text,
          value: f.item_id
        }
      })
    } catch (error: any) {
      this.religionList = [];
    }
  }

  async getJournals() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('journalList')
      );
      response.data.map((x: any) => {
        this.journalList.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
      this.fieldsGeneral.find(f => f.key == 'journal')!.props!.options = this.journalList.map((f: any) => {
        return {
          label: f.item_text,
          value: f.item_id
        }
      })
    } catch (error: any) {
      this.journalList = [];
    }
  }

  async getDependency() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('dependecyList')
      );
      response.data.map((x: any) => {
        this.dependecyList.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
      this.fieldsGeneral.find(f => f.key == 'dependency')!.props!.options = this.dependecyList.map((f: any) => {
        return {
          label: f.item_text,
          value: f.item_id
        }
      })
    } catch (error: any) {
      this.dependecyList = [];
    }
  }

  async getJobs() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('PROFESION')
      );
      response.data.map((x: any) => {
        this.jobs.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
      this.fieldsGeneral.find(f => f.key == 'carrer')!.props!.options = this.jobs.map((f: any) => {
        return {
          label: f.item_text,
          value: f.item_id
        }
      })
    } catch (error: any) {
      this.jobs = [];
    }
  }

  async onGetCountry() {
    try {
      const response = await lastValueFrom(this.userService.getCountries());
      response.data.forEach((element: any) => {
        this.countries.push({
          item_id: element._id,
          item_text: element.name,
        });
      });
      this.fieldsGeneral.find(f => f.key == 'country')!.props!.options = this.countries.map((f: any) => {
        return {
          label: f.item_text,
          value: f.item_id
        }
      })
    } catch (error: any) {
      this.countries = [];
    }
  }

  async getGenero() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('GENERO')
      );

      response.data.forEach((x: any) => {
        this.genders.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
      this.fieldsGeneral.find(f => f.key == 'gender')!.props!.options = this.genders.map((f: any) => {
        return {
          label: f.item_text,
          value: f.item_id
        }
      })
    } catch (error: any) {
      this.genders = [];
    }
  }

  async onRegister(form: any) {
    try {

      if (this.model.type == 1 || this.model.type == 2) {
        if (this.model.file == "") {
          this.toastrService.warning("Selecciona una imágen", "Aviso");
          return;
        }
      }

      form.userId = this.userId;
      const response = await lastValueFrom(
        this.layoutServiceService.createAds(form)
      );
      if (response.data !== null) {
        this.errMsj = response.message;
        this.saveAds.emit({
          messague: this.errMsj,
          result: true
        });
      }
    } catch (error: any) {
      this.errMsj = error.error.message;
      this.saveAds.emit({
        messague: this.errMsj,
        result: false
      });
    }
  }

  onAccepReview(form: AdsI) {
    this.acceptAds.emit(form);
  }

  onRejectReview(form: AdsI) {
    if (this.data.comentary == "" || this.data.comentary == null || this.data.comentary == undefined) {
      this.toastrService.warning("Agrega una observación para rechazar el anuncio...",
        "Aviso")
      return;
    }
    this.rejectAds.emit(form);
  }


  async getPackageAds() {
    const resp = await lastValueFrom(this.adminService.getPackageActive());
    if (resp !== null) {
      this.allPackage = resp.data;
      this.fieldsTipo.find(f => f.key == 'package')!.props!.options = this.allPackage.map((f: any) => {
        return {
          label: f.name,
          value: f._id
        }
      })
    } else {
      this.allPackage = [];
    }
  }

  setFile(event: any) {
    const file = event.target.files[0];
    if (file && file.type.includes('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.model.file = base64String;
      };
      reader.readAsDataURL(file);
    }
  }

  setImage(image: any) {
    this.model.file = image.file;
    this.selectedImage = image;
  }

}
