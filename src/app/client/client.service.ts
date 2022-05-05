import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable,of } from 'rxjs';
import { Client } from './model/Client';
import { CLIENT_DATA } from './model/mock-clients';
@Injectable({
  providedIn: 'root'
})

export class ClientService {
  
  resultado: number;
  valor : number;
  constructor(
    private http : HttpClient,
  

   
  ) { }

 
  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>('http://localhost:8080/client');
  }

  saveClient(client: Client): Observable<Client> {
    let url = 'http://localhost:8080/client';
    if (client.id != null) url += '/' + client.id;

    return this.http.post<Client>(url, client);

  }

  
  deleteClient(idClient: number): Observable<any> {
    return this.http.delete<void>('http://localhost:8080/client/' + idClient);
  }

  //validateClient(name? : string): void {
   
   
    //let url = 'http://localhost:8080/client/validar?name=' + name;
    
    //this.http.get<number>(url).subscribe(responseData =>{
     // this.obtenerValor();
      //this.resultado =responseData;
      //const valor1 = this.resultado;
      //this.resultado = responseData ;
     
    //   if(this.resultado >= 1 ){
         
     //    alert("No puede crear el cliente " + valor1);
      
     //  }
      // if (this.resultado == 0) {
      
       //}
       
     //});
   
    //}
 
   // obtenerValor (): number {
     //return  this.resultado
      
    //}

  }

