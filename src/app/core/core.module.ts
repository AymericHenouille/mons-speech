import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FireModule } from './fire/fire.module';

const MODULES: Type<any>[] = [
  BrowserModule,
  FireModule
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES]
})
export class CoreModule { }
