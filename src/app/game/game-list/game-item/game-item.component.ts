import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../model/Game';
import { GameService } from '../../game.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  @Input() game: Game;

  constructor(
    private gameService: GameService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  
  deleteGame(game: Game) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        this.deleteGame(game);
      }
    });
  }
}