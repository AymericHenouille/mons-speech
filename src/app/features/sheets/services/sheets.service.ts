import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class SheetsService {

  public static readonly SPREAD_SHEET_ID: string = '1RguIJuPPRJkBwg9t9plm3vQGrNOC5-VShUN8iFMCK7U';

  public constructor(
    private readonly auth: AuthService,
    private readonly http: HttpClient,
  ) { }

  public getSpreadsheetByRange(spreadsheetId: string, range: string): Observable<any> {
    return this.auth.accessToken.pipe(
      switchMap((accessToken) => this.http.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=true&ranges=${range}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })),
    );
  }
}
