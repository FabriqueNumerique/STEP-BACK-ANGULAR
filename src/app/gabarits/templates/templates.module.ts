import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { Template1Component } from './template1/template1.component';
import { Template2Component } from './template2/template2.component';
import { Template3Component } from './template3/template3.component';
import { Template4Component } from './template4/template4.component';
import { Template5Component } from './template5/template5.component';


@NgModule({
  declarations: [
    TemplatesComponent,
    Template1Component,
    Template2Component,
    Template3Component,
    Template4Component,
    Template5Component
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule
  ]
})
export class TemplatesModule { }
