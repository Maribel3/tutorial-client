import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  selectedClient: Client;
  client : Client;
  resultado: number;
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
  ngOnInit(): void {
    if (this.data.client != null) {
     // this.client =this.data.client;
      this.client = Object.assign({}, this.data.client);

    }
    else {
      this.client = new Client();
     
    }
    
  }

  /**
   * metodo para comprobar si existe
   * obtener el listado de todos los autores que hay
   * comprobar si en el listado hay alguno con el nombre nuevo
   */
  /**
     * comprobar si existe un autor con el nombre nuevo
     */

  onSave(){
  
   

    let url = 'http://localhost:8080/client/validar?name=' + this.selectedClient.name;
   
    this.http.get<number>(url).subscribe(responseData => {
     
     
      this.resultado = responseData;
      
      if (this.resultado >= 1) {

        alert("No puede crear el cliente " + this.resultado);

      }
      if (this.resultado == 0) {
       
        this.clientService.saveClient(this.client).subscribe(result => {
          this.dialogRef.close();

        });
       
        
      }

    });
   
   
     
  }
  

   validateName(): boolean{
    for(let i in Client){

      if (i == this.selectedClient.name){
        alert("si")
        return true
      }
      else {
        return false
      }
    }
  }
  onClose(){
    this.dialogRef.close();
  }
}
