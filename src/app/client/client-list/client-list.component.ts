import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../model/Client';
import { ClientService } from '../client.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { LoanService } from 'src/app/loan/loan.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  selectedClient: Client;
  clientsLoad: number;
  onSelectClient(client: Client): void {
    this.selectedClient = client;

  }
  dataSource = new MatTableDataSource<Client>();
  displayedColumns:string[]= ['id', 'name', 'action'];
  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    private http: HttpClient,
    private loanService : LoanService
  ) { }
  createClient() {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }  
  
  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.dataSource.data = clients
    );
  }
  editClient(client: Client) {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: { client: client }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteClient(client: Client) {
 
    let url = 'http://localhost:8080/load/comprobarClientePrestamo?client_id=' + client.id;

    this.http.get<number>(url).subscribe( responseData => {
      this.clientsLoad = responseData;

      if(this.clientsLoad >=1){
        alert("No puede borrar un cliente que tiene prestamos");
        this.dialog.afterAllClosed;
      }
      else {

        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.clientService.deleteClient(client.id).subscribe(result => {
              this.ngOnInit();
            });
          }
        });
      }

    });
 

  }
}
