import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SheetsService } from '../../sheets/services/sheets.service';
import { Brother } from '../models/brother.model';

@Injectable()
export class BrotherService {
  public static readonly SHEET_NAME: string = 'Coordonnées Orateurs';

  public constructor(
    private readonly sheetService: SheetsService,
  ) { }

  public get brothers$(): Observable<Brother[]> {
    return this.sheetService.getSpreadsheetByRange(SheetsService.SPREAD_SHEET_ID, `${BrotherService.SHEET_NAME}!A2:H`).pipe(
      map((result) => result.sheets[0].data[0].rowData),
      map((data) => data
        .filter(({rowData}: any) => !!rowData)
        .map(({rowData}: any) => rowData
          .filter(({values}: any) => !!values)
          .map(({values}: any) => values.map(({formattedValue}: any) => formattedValue)))[0]
      ),
      map((brothers: any[]) => brothers
        .filter(([name]) => !!name)
        .map(([name, congregation, email, jwEmail, phone, fixedLine]) => ({
          name,
          congregation,
          email,
          jwEmail,
          phone,
          fixedLine,
        })))
    );
  }

}
