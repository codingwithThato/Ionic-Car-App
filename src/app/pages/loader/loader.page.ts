import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const timeoutDelay = 3000;
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, timeoutDelay);
  }

}
