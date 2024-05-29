import { Hero } from './interfaces/hero.interface';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { HeroPipe } from './pipes/hero-image/hero-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    HeroPipe
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
