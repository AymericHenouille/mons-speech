import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SheetsService } from '../../sheets/services/sheets.service';
import { Speech } from '../models/speech.model';
import { BrotherService } from './brother.service';

@Injectable()
export class SpeechService {

  public static readonly SHEET_NAME: string = 'Discours et Orateurs';

  public constructor(
    private readonly sheetService: SheetsService,
    private readonly brotherService: BrotherService,
  ) { }

  public get speechs$(): Observable<Speech[]> {
    return this.sheetService.getSpreadsheetByRange(SheetsService.SPREAD_SHEET_ID, `${SpeechService.SHEET_NAME}!A4:B`).pipe(
      map((result) => result.sheets[0].data[0].rowData),
      map((data) => data
        .filter(({rowData}: any) => !!rowData)
        .map(({rowData}: any) => rowData
          .filter(({values}: any) => !!values)
          .map(({values}: any) => values.map(({formattedValue}: any) => formattedValue)))
      ),
      map((rowSpeechs: any[][]) => rowSpeechs.map((rowSpeech: any[]) => {
        const id: string = rowSpeech.shift();
        const title: string = rowSpeech.shift();
        const brothers: string[] = rowSpeech.filter((s: string) => !!s);
        return {
          id,
          title,
          brothers,
        }
      })),
    );
  }

}
