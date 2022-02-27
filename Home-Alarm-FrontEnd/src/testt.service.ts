import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {log} from 'util';
import {Location} from '@angular/common';
import {Baza} from './app/baza';

@Injectable({
  providedIn: 'root'
})
export class TesttService {
  private Url = 'http://192.168.1.15:5001';

  constructor(private http: HttpClient, private location: Location) {
  }


  gett(): Observable<string> {
    let headersList = new HttpHeaders();
    headersList = headersList.append('Access-Control-Allow-Origin', '*');
    return this.http.get(this.Url + '/Alarm/ProvjeriStatusAlarma', {headers: headersList, responseType: 'text'});
  }

  getFromDatabase(): Observable<Baza[]> {
    let headersList = new HttpHeaders();
    headersList = headersList.append('Access-Control-Allow-Origin', '*');
    return this.http.get<Baza[]>(this.Url + '/Alarm/GetAll', {headers: headersList, responseType: 'json'});
  }

  postt(): Observable<any> {

    let headersList = new HttpHeaders();
    headersList = headersList.append('Access-Control-Allow-Origin', '*');
    return this.http.get(this.Url + '/Alarm/UgasiAlarm', {headers: headersList, responseType: 'text'});

  }
  brisi(id: number): Observable<any> {
    return this.http.post(this.Url + '/Alarm/BrisiById/' + id, id);
  }

}

