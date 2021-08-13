import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  // Modèle d'exemple pour la création d'un formulaire dynamique
  form = new FormGroup({});
  
  model = { email: 'email@gmail.com' };

  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      key: 'Nom',
      type: 'input',
      templateOptions: {
        label: 'Nom',
        placeholder: 'Saisissez votre nom',
        required: true,
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.model);
  }

}
