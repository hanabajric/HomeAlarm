import {Component, OnDestroy, OnInit} from '@angular/core';
import {TesttService} from '../../testt.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {
  intervalId: number;
  title;
  upaljeno = false;
  color;
  photo = 'src/assets/pozadina_ugasen.png';


  constructor(private testtService: TesttService, private router: Router) {
  }

  getParallaxImage() {
   const a = 'url' + '("' + this.photo + '")';
   return a;
  }

  ngOnInit() {// daje status alarma(pri učitavanju status komponente
    this.testtService.gett().subscribe(data => {
      this.title = data;
      if (data === 'Alarm je Upaljen') {
        this.upaljeno = true;
      }
    });
    this.intervalId = setInterval(() => {
      // js funkcija koja periodicno salje zahtjev,
      // periodicno pokretanje neke funkcije
      this.checkStatus();
    }, 4000);
  }

  checkStatus() {
    this.testtService.gett().subscribe(data => {
      this.title = data;
      if (data === 'Alarm je upaljen') {
        this.router.navigateByUrl('/status');
        this.upaljeno = true;
        const audio = new Audio();
        audio.src = '../assets/mixkit-classic-alarm-995.wav';
        audio.load();
        audio.play();

      }

    });
    this.color = 'red';
  }

  ugasi() {
    this.testtService.postt().subscribe(test => {
      console.log(test.stat);
      this.title = test.stat;
      this.upaljeno = false;
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
