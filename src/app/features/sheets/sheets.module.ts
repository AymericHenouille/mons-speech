import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { SheetsService } from './services/sheets.service';

@NgModule({
  imports: [AuthModule],
  providers: [SheetsService]
})
export class SheetsModule { }
