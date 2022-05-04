import { Component, OnInit,Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from '../module/Loan';
import { LoanService } from '../loan.service';
import { MatDialog } from '@angular/material/dialog';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';
import { GameService } from 'src/app/game/game.service';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { ClientService } from 'src/app/client/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { range } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
  

export class LoanListComponent implements OnInit {
 
 public fec : Date;
 public fetString: string;
  public formatDate: string;

  games: Game[];
  //loan : Loan[];

  loan : Loan;
  clients : Client[];
  selectedGame : Game;
  selectedClient : Client;
  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[]=['id','Game','Client','Date_loan','Date_return','action'];
  
  public range = new FormGroup({
    start: new FormControl(),
    end : new FormControl()
  });
  constructor(
    
    private pd: DatePipe,
    private loanService: LoanService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private clientService : ClientService,
    private gameService: GameService
  ) { }

onSelectGame(games: Game) : number{
  this.selectedGame = games;

  return this.selectedGame.id;
  
}
  onSelectClient(client: Client): number {
   
    this.selectedClient = client;
    return this.selectedClient.id

  }
  ngOnInit(): void {
   

    this.searchDate();
      this.loanService.getLoans().subscribe(
        loan => this.dataSource.data = loan
      );
    this.gameService.getGames().subscribe(
      games => this.games = games
    );
    this.clientService.getClients().subscribe(
      clients => this.clients = clients 
    );
    
  }

  onCleanFilter(): void{
    this.selectedGame = null;
   
    this.selectedClient = null;
  
    this.onSearch();
   
  }

  onSearch(): void {

    this.fetString = this.pd.transform(this.range.controls.start.value, 'YYY-MM-dd');
    this.loanService.seleccionarFecha(this.fetString);

    let idGame = null;
    if(this.selectedGame != null){
      idGame = this.selectedGame.id;
    }
    let idClient = null;
    if (this.selectedClient != null) {
      idClient = this.selectedClient.id;
    }
    let fechaBusqueda = null;
    if(this.fetString !=null){
      fechaBusqueda = this.fetString;
    }

    this.loanService.getLoans(idGame, idClient,fechaBusqueda).subscribe(
      loan1 => this.dataSource.data = loan1

    );
   
    
  }
  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }  
  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: { category: loan }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

   
   
enviar () {
 // this.fec = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());
  //this.fetString = this.pd.transform(this.fec,"yyyy-MM-dd");
  //today: stringify = this.range.controls.start;
 this.formatDate= this.pd.transform(this.range.controls.start.value, 'dd-MM-YYYY');
this.fetString = this.pd.transform(this.range.controls.start.value,'YYY-MM-dd');
  alert("fecha normal " + this.formatDate
  + "fecha invertida " + this.fetString);

}
 public  searchDate(){
   this.fetString = this.pd.transform(this.range.controls.start.value, 'YYY-MM-dd');
 
  }
  
  public classGame(): Game[]{
    
    return this.games;
  }
  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar préstamo ", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  } 

  }

