import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {id: 'DC Comics', description: 'DC - Comics'},
    {id: 'Marvel Comics', description: 'Marvel - Comics'}
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){}

  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    // console.log(hero);
    return hero;
  }

  ngOnInit(): void {
      if(!this.router.url.includes('edit')) return;

      this.activatedRoute.params.pipe(
        switchMap(({id}) => this.heroesService.getHeroById(id)),
      ).subscribe(
        hero => {
          if(!hero) return this.router.navigateByUrl('/');
          this.heroForm.reset(hero);
          return;
        }
      );

  }

  onSubmit(): void{

    if(this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(
        hero => {
          this.showSnackBar(`Superhéroe ${hero.superhero} actualizado!`);
      });
    }

    this.heroesService.addHero(this.currentHero)
    .subscribe(
      hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar(`Superhéroe ${hero.superhero}, creado!`)
    });

  }

  onDeleteDialog():void{
    if (!this.currentHero.id) throw Error('Hero is required');

    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter( result => result === true),
      switchMap( () => this.heroesService.deleteHeroById(this.currentHero.id)),
      filter((isDeleted) => isDeleted)
    )
    .subscribe(() => {
      this.router.navigate(['/heroes']);
    });


        // dialogRef.afterClosed().subscribe(result => {
        //   if( !result ) return;

        //   this.heroesService.deleteHeroById(this.currentHero.id)
        //   .subscribe( isDeleted => {
        //     if(isDeleted){
        //       this.router.navigate(['/heroes']);
        //     }
        //   });
        // });
  }


  showSnackBar(message: string): void{
    this.snackBar.open(message, ' done', {
      duration: 2500,
    });
  }


}
