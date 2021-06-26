import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Mhahero } from './mhahero'
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Mhaherosresponse } from './mhaherosresponse';

@Injectable({
  providedIn: 'root'
})
export class MhaapiService {

  apiURL: string = 'https://myheroacademiaapi.com/api/';

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  public getMhaHeroes(): Observable<Mhaherosresponse> {
    return this.httpClient.get<Mhaherosresponse>(`${this.apiURL}character`)
      .pipe(
        tap(_ => this.log('fetched MHA heroes')),
        catchError(this.handleError<Mhaherosresponse>('getMhaHeroes'))
      );
  }

  public getMhaHeroById(id: string): Observable<Mhahero> {
    const url = `${this.apiURL}character/${id}`;
    return this.httpClient.get<Mhahero>(url).pipe(
      tap(_ => this.log(`fetched MHA hero id=${id}`)),
      catchError(this.handleError<Mhahero>(`getMhaHero id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`MhaApiService: ${message}`);
  }
}
