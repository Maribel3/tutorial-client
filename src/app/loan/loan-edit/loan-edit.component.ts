import { Component, OnInit,Input,Inject } from '@angular/core';
import { Game } from 'src/app/game/model/Game';
import { FormsModule } from '@angular/forms';
import { GameService } from 'src/app/game/game.service';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan.service';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

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

  sumaFecha : string;
  fechaSumada : Date;
  public range = new FormGroup({
    start: new FormControl(),
    end : new FormControl(),
    final : new FormControl()
  });
  selectedGame: Game;
  selectedClient: Client;
  resultadoLoan : number;
  resultadoGameClient: number;
  resultadoCountGameDate: number;
  onSelectGame(game: Game): void {
    this.selectedGame = game;
  }
  onSelectClient(client: Client): void {
    this.selectedClient = client;
   
  }
  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    private clientService: ClientService,
    private pd: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,


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
  alert("fecha final formateada " + this.fechaFinal);
    this.fechaInicialBase = this.pd.transform(this.range.controls.start.value, 'YYYY-MM-dd');
    this.fechaFinBase = this.pd.transform(this.range.controls.end.value, 'YYYY-MM-dd');

    let params = '';

   // if (this.selectedGame != null) {
      
    //  params += 'fecha=' + this.fechaInicialBase;
    //}

    //if (this.fechaInicialBase != null) {
      //if (params != '') params += "&";

      //params += "game_id=" + this.selectedGame;

    //}//cambio fecha de inicio por fin
   // let urlValidateLoan = 'http://localhost:8080/load/validateLoan?fecha='+this.fechaInicialBase+'&game_id='+this.selectedGame.id ;
   // let urlValidateClientLoan = 'http://localhost:8080/load/validateGameLoad?fecha=' + this.fechaFinBase + '&client_id=' + this.selectedClient.id;
    // days da resto de la fecha de inicio y la fecha fin

    
    let days = (this.range.controls.end.value.getDate() - (this.range.controls.start.value.getDate()));
    this.fechaSumada = this.range.controls.start.value.setDate(this.range.controls.start.value.getDate()+days);
    this.sumaFecha = this.pd.transform(this.fechaSumada, 'YYYY-MM-dd');
   
    let urlClientCount = 'http://localhost:8080/load/fechaInferior?fecha=' + this.sumaFecha + '&client_id=' + this.selectedClient.id;
    let urlValidateLoan = 'http://localhost:8080/load/validateLoan?fecha=' + this.sumaFecha + '&game_id=' + this.selectedGame.id;
   // let urlValidateClientLoan = 'http://localhost:8080/load/validateGameLoad?fecha=' + this.fechaFinBase + '&client_id=' + this.selectedClient.id;

    //alert("suma de fecha más el resto " + this.sumaFecha);
    //alert("fecha sin sumar " + this.fechaInicialBase + "fecha sumada " + this.sumaFecha);
    //alert("fecha fin base " + this.fechaFinBase);
    //alert("fecha inicio " + this.fechaInicialBase);

    this.http.get<number>(urlValidateLoan).subscribe(responseDataLoan =>{
     alert("game_id " + this.selectedGame.id);
    // this.http.get<number>(urlValidateClientLoan).subscribe(responseDateClient =>{
     this.http.get<number>(urlClientCount).subscribe( responseClientCount => {
    alert("client_id " + this.selectedClient.id);
     
      
       this.resultadoCountGameDate = responseClientCount;
      // this.resultadoGameClient = responseDateClient;
       alert("método fechaInferior" + this.resultadoCountGameDate);
      this.resultadoLoan = responseDataLoan;
       alert("método validateLoan " + this.resultadoLoan);
      //alert("contar validateLoan " + this.resultadoLoan);
      if  (days <= 14 && new Date(this.range.controls.start.value)
        <= new Date(this.range.controls.end.value) && this.resultadoCountGameDate <= 2 && this.resultadoLoan ==0 ){
          alert("entro");
       this.loan.client.id = this.selectedClient.id;
       this.loan.game.id = this.selectedGame.id;
       this.loan.dateLoan = this.fechaInicialBase;
       this.loan.dateReturn = this.fechaFinBase;
       this.loanService.saveLoan(this.loan).subscribe(result => {
         this.dialogRef.close();
      });
        
      }
      else {
        if(this.resultadoLoan>=1){
          alert("Juego prestado el mismo día");
          this.dialogRef.close();
        }
        if (days>=15){
          alert("La fecha final no puede superar los 14 días");
          this.dialogRef.close();
        }
        if(this.resultadoGameClient>2){
          alert("juegos " + this.resultadoGameClient);
          
           
          alert("Tiene dos juegos prestados");
          this.dialogRef.close();
        }
        if(this.resultadoCountGameDate>=1){
          alert("No puede crear un juego anterior");
          this.dialogRef.close();
        }

      }
     });// fin de consulta clientCount
    // });// fin consulta juegos
    });//fin consulta fecha duplicada

   
  }
  onClose() {
    this.dialogRef.close();
  }
}
