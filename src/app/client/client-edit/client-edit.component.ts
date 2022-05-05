import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Game } from 'src/app/game/model/Game';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  selectedClient: Client;
  client : Client;
  resultado: number;
  selectedGame: Game;


  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,

    private clientService: ClientService
  ) { }
  onSelectClient(client: Client): string {

    this.selectedClient = client;
    return this.selectedClient.name;

  }

  onSelectGame(game: Game): number {

    this.selectedGame = game;
    return this.selectedGame.id;

  }
  ngOnInit(): void {
    if (this.data.client != null) {
   
      this.client = Object.assign({}, this.data.client);

    }
    else {
      this.client = new Client();
     
    }
    
  }

  onSave(){
   
    let url = 'http://localhost:8080/client/validar?name=' + this.selectedClient.name;
   
    let params = '';

    if (this.selectedGame != null) {
      params += "game_id=" + this.selectedGame;
    }
    if (this.selectedGame != null) {
      if (params != '') params += "&";

      params += "client_id=" + this.selectedGame;

    }
    this.http.get<number>(url).subscribe(responseData => {
    
      this.resultado = responseData;
      
      if (this.resultado >= 1) {

        alert("No puede crear el cliente el nombre ya existe " );

      }
      if (this.resultado == 0) {
       alert("Cliente creado correctamente ")
        this.clientService.saveClient(this.client).subscribe(result => {
          this.dialogRef.close();

        });
       
      }

    });
   
     
  }
  

  
  onClose(){
    this.dialogRef.close();
  }
}
