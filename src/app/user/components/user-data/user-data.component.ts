import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  dropdownList: any = [];
  dropdownList1: any = [];
  selectedItems: any = [];
  selectedItems1: any = [];
  dropdownSettings: IDropdownSettings = {};

  ngOnInit() {
    this.dropdownList = [
      { id: 1, text: 'Comunista' },
      { id: 2, text: 'Socialista' },
      { id: 3, text: 'Liberal' },
      { id: 4, text: 'Conservador' },
      { id: 5, text: 'Monárquico' },
      { id: 6, text: 'Indiferente' },
      { id: 7, text: 'Libertario' },
      { id: 8, text: 'Anarquista' },
      { id: 9, text: 'Nacionalista' },
      { id: 10, text: 'Religioso' },
    ];
    this.dropdownList1 = [
      { id: 1, text: 'Soltero' },
      { id: 2, text: 'Casado' },
      { id: 3, text: 'Divorciado' },
      { id: 4, text: 'Viudo' },
    ];
    this.selectedItems = [];
    this.selectedItems1 = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      allowSearchFilter: true,
      clearSearchFilter: true,
      searchPlaceholderText: 'Buscar',
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onItemSelect1(item: any) {
    console.log(item);
  }

  onUpdate(form: any) {
    console.log('form', form.value);
  }
}
