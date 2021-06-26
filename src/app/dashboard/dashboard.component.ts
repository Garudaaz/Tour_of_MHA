import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MhaapiService } from '../mhaapi.service';
import { Mhahero } from '../mhahero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  mhaHeroes: Mhahero[] = [];

  constructor(private heroService: HeroService, private mhaApiService: MhaapiService) { }

  ngOnInit() {
    this.getMhaHeroes();
    //this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  getMhaHeroes(): void {
    this.mhaApiService.getMhaHeroes().subscribe(mhaHeroes => this.mhaHeroes = mhaHeroes.result.slice(1, 5));
  }
}
