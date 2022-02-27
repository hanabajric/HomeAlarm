import {Component, OnInit} from '@angular/core';
import {TesttService} from '../../testt.service';
import {Baza} from '../baza';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-historija',
  templateUrl: './historija.component.html',
  styleUrls: ['./historija.component.css']
})
export class HistorijaComponent implements OnInit {
  public lista: Baza[] = [];

  constructor( private testtService: TesttService, private router: Router) {
  }

  ngOnInit() {
    this.testtService.getFromDatabase().subscribe(data => {
      this.lista = data;
      this.lista.forEach(datas => {
        const x = new Date(datas.datum);
        datas.datum = x.toDateString() + ' ' + x.toTimeString();
      });
    });
  }

brisi(id: number) {
    console.log('nestoooo');

    this.testtService.brisi(id).subscribe(data => {

      alert('Uspješno obrisano');
      // this.router.navigateByUrl('/history');
      this.ngOnInit();

      }
    );
}
}
