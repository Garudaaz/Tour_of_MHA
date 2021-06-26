import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { MhaapiService } from '../mhaapi.service';
import { Mhahero } from '../mhahero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  @Input() mhaHero: Mhahero;

  constructor(
    private route: ActivatedRoute,
    private mhaApiService: MhaapiService,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMhaHero();
    //this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  getMhaHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.mhaApiService.getMhaHeroById(id).subscribe(mhaHero => this.mhaHero = mhaHero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
