import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  dropdownSettings: IDropdownSettings = {};
  rolList: any = [];
  selectedRol: any = [];

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }

  ngOnInit() {
    this.selectedRol = [];

    this.rolList = [
      { item_id: '1', item_text: 'Soporte Sistemas' },
      { item_id: '2', item_text: 'Soporte Ventas' },
      { item_id: '3', item_text: 'Soporte Anuncios' },
      ,
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Todos',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onSelectRol(item: any) {
    console.log('1', item);
    this.selectedRol = [];
    this.selectedRol.push(item);
  }

  onSelectAllRoles(items: any) {
    console.log('2', items);
    this.selectedRol = [];
    items.forEach((element: any) => {
      this.selectedRol.push(element);
    });
  }

  async onRegisterAdmin(form: any) {
    console.log('form', form.value);
    console.log('item', this.selectedRol);
  }
}
