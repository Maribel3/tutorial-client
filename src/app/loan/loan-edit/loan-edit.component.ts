import { Component, OnInit,Input,Inject } from '@angular/core';
import { Game } from 'src/app/game/model/Game';
import { FormsModule } from '@angular/forms';
import { GameService } from 'src/app/game/game.service';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from '../module/Loan';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {
  loan: Loan;
  games: Game[];
  clients : Client[];
  fechaInicial : string;
  fechaFinal : string;
  fechaLimite : string;
  fechaInicialBase : string;
  fechaFinalBase : string;
  fechaFinBase: string;
  public range = new FormGroup({
    start: new FormControl(),
    end : new FormControl(),
    final : new FormControl()
  });
  selectedGame: Game;
  selectedClient: Client;
  minimo : Date;
  onSelectGame(game: Game): void {
    this.selectedGame = game;
  }
  onSelectClient(client: Client): void {
    this.selectedClient = client;
    alert("client " + this.selectedClient.id)
  }
  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    private clientService: ClientService,
    private pd: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private gameService: GameService,
    private loanService: LoanService,
  ) { }

  ngOnInit(): void {

  
    if (this.data.loan != null) {
      this.loan = Object.assign({}, this.data.game);
    }
    else {
      this.loan = new Loan();
    }
    this.fechaInicial = this.pd.transform(this.range.controls.start.value, 'dd-MM-YYYY');
    this.fechaFinal = this.pd.transform(this.range.controls.end.value, 'dd-MM-YYYY');
   
    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );
    this.gameService.getGames().subscribe(
      games => this.games = games
    );
    this.loanService.getLoans().subscribe(
      loan => loan = loan
    );
   
  }
  onSave() {
    
    this.fechaInicial = this.pd.transform(this.range.controls.start.value, 'dd-MM-YYYY' );
    this.fechaFinal = this.pd.transform(this.range.controls.end.value, 'dd-MM-YYYY');
   // this.range.controls.final = this.range.controls.start;
   // this.fechaFinBase = this.pd.transform(this.range.controls.final.value.setDate(this.range.controls.final.value.getDate() + 14));
   // this.fechaLimite = this.pd.transform(this.range.controls.start.value.setDate(this.range.controls.start.value.getDate() + 14));
   // this.fechaLimite = this.pd.transform(this.range.controls.start.value, 'dd-MM-YYYY');
   // this.fechaFinBase = this.pd.transform(this.range.controls.final.value, 'dd-MM-YYYY');
    this.fechaInicialBase = this.pd.transform(this.range.controls.start.value, 'YYYY-MM-dd');
    this.fechaFinalBase = this.pd.transform(this.range.controls.end.value, 'YYYY-MM-dd');
   
    let days = (this.range.controls.end.value.getDate() - (this.range.controls.start.value.getDate()));
    alert("dias restantes = " + days);
    
    if ( days>=15) {
    alert("La fecha final no puede superar los 14 días")
  
    } 
 else {
   if (days<=14 && new Date(this.range.controls.start.value) < new Date(this.range.controls.end.value)){
     alert("start  end " );
     
    // if ( days <=14){
       alert("fecha inicial inferior a la fecha final");
       this.loan.client = this.selectedClient;
       this.loan.game = this.selectedGame;
       this.loan.dateLoan = this.fechaInicialBase;
       this.loan.dateReturn = this.fechaFinalBase;
       this.loanService.saveLoan(this.loan).subscribe(result => {
         this.dialogRef.close();
       });

     }
     else {
       alert("la fecha inicial no es inferior a la fecha final");
     }
   
  
   
  }
  }
  onClose() {
    this.dialogRef.close();
  }
}
