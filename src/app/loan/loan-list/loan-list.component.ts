import { Component, OnInit,Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from '../model/Loan';
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
import { DatePipe } from '@angular/common';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { PageEvent } from '@angular/material/paginator';
import { MatInput } from '@angular/material/input';
import { ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
  

export class LoanListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;
  @ViewChild('selectGame', {
    read : MatSelect
  }) selectGame : MatSelect;
  @ViewChild('selectClient', {
    read: MatSelect
  }) selectClient: MatSelect;

 public fec : Date;
 public fetString: string;
 public formatDate: string;

  games: Game[];
 // paginar : Pageable;
  loan : Loan;
  clients : Client[];
  selectedGame : Game;
  selectedClient : Client;
  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[]=['id','Game','Client','Date_loan','Date_return','action'];
  
  public range = new FormGroup({
    start: new FormControl(),
    end : new FormControl(),
    comboGame : new FormControl(),
    comboClient : new FormControl(),
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
    this.loadPage();
    this.gameService.getGames().subscribe(
      games => this.games = games
    );
    this.clientService.getClients().subscribe(
      clients => this.clients = clients 
    );
    
  }

  loadPage(event?: PageEvent) {

     let pageable: Pageable = {
     
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }
    if (event != null) {
      pageable.pageSize = event.pageSize
      pageable.pageNumber = event.pageIndex;
    
    }
   
    this.fetString = this.pd.transform(this.range.controls.start.value, 'YYY-MM-dd');
    this.loanService.seleccionarFecha(this.fetString);

    let idGame = null;
    if (this.selectedGame != null) {
      idGame = this.selectedGame.id;
    }
    let idClient = null;
    if (this.selectedClient != null) {
      idClient = this.selectedClient.id;
    }
    let fechaBusqueda = null;
    if (this.fetString != null) {
      fechaBusqueda = this.fetString;
    }

    //llega bien
    this.loanService.getLoan(idGame, idClient, fechaBusqueda, pageable).subscribe(dataLoan => {
      this.dataSource.data = dataLoan.content;
      this.pageNumber = dataLoan.pageable.pageNumber;
    //pageSize coge 20
    
      this.pageSize = dataLoan.pageable.pageSize;
      this.totalElements = dataLoan.totalElements;
      });
    
  }
  onCleanFilter(): void{
   this.selectClient.value = undefined;
   this.selectGame.value = undefined;
   this.fromInput.value = '';
    let idGame = null;
    if (this.selectedGame != null) {
      idGame = this.selectedGame.id;
    }
    let idClient = null;
    if (this.selectedClient != null) {
      idClient = this.selectedClient.id;
    }
    let fechaBusqueda = null;
    if (this.fetString != null) {
      fechaBusqueda = this.fetString;
    }
    this.loanService.getLoan().subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;

    });

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


 //  this.loanService.getLoan(idGame, idClient, fechaBusqueda, this.paginar).subscribe(data => {
   //   this.dataSource.data = data.content;
     //    });

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

//enviar () {
//this.formatDate= this.pd.transform(this.range.controls.start.value, 'dd-MM-YYYY');
//this.fetString = this.pd.transform(this.range.controls.start.value,'YYY-MM-dd');

//}
 public  searchDate(){
   this.fetString = this.pd.transform(this.range.controls.start.value, 'YYY-MM-dd');
 
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

