import { NgModule } from '@angular/core';
import { SheetsModule } from '../sheets/sheets.module';
import { BrotherService } from './services/brother.service';
import { SpeechService } from './services/speech.service';

@NgModule({
  imports: [SheetsModule],
  providers: [SpeechService, BrotherService]
})
export class DataModule { }
