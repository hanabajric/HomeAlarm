import {Component, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TesttService} from '../testt.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  intervalId: number;

  constructor(private testtService: TesttService, private router: Router) {

  }


  ngOnInit(): void { // stalni refres
    this.intervalId = setInterval(() => {
      this.checkStatus();
    }, 4000);
  }

  isHomeRoute() {
    return this.router.url === '/';
  }

  checkStatus() {
    this.testtService.gett().subscribe(data => {
      if (data === 'Alarm je upaljen') {
        this.router.navigateByUrl('/status');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
