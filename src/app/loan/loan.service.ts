import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Loan } from './model/Loan';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})


export class LoanService {
 
   conversion: string
  constructor(
    
    private http: HttpClient

  ) { }

  findClient(client_id:number): string {
let params ='';

if (client_id != null){
 // if (params != '') params += "&";
  params += "client=" + client_id;

}
    let url = 'http://localhost:8080/load/findClient/'

    if (params == '') return url;
    else return url + '?' + params;
  }

  findGame(game_id: number): string {
    let params = '';

    if (game_id != null) {
     
      params += "game_id=" + game_id;

    }
    let url = 'http://localhost:8080/load/game/'

    if (params == '') return url;
    else return url + '?' + params;
  }
  searchClientGame(game_id?: number, client_id?: number): string{
    let params ='';

    if (game_id != null){
      params +="game_id=" + game_id;
    }
    if (client_id !=null){
      if (params != '') params += "&";

      params += "client_id=" + client_id;

    }

    let url = 'http://localhost:8080/load/findGameClient/'

    if (params =='') return url;
    else return url +'?' + params;

    
  }
  getLoans(game_id?: number,client_id?: number, fecha?:string): Observable<Loan[] >{
    if(game_id == null && client_id == null && fecha == null){
      return this.http.get<Loan[]>(this.searchClientGame(game_id,client_id));
    } 

    if (game_id != null && client_id != null && fecha != null) {
      return this.http.get<Loan[]>(this.findSearchFilter(game_id, client_id, fecha));

    }
    if( game_id == null && client_id == null && fecha != null){
      return this.http.get<Loan[]>(this.findSearchFilter(game_id, client_id,fecha));
    }
    
    if (game_id == null && client_id!= null && fecha==null){
      return this.http.get<Loan[]>(this.findClient(client_id));
    } 
    if (game_id != null && client_id == null && fecha == null){
      return this.http.get<Loan[]>(this.findGame(game_id));
    }

    if (game_id ==null && client_id != null && fecha != null){
     
      return this.http.get<Loan[]>(this.findSearchClientDate(client_id,fecha));
    }
    if (game_id != null && client_id == null && fecha != null) {
     
      return this.http.get<Loan[]>(this.findGameDate(game_id, fecha));
    }
    if(game_id != null && client_id != null && fecha == null){
      return this.http.get<Loan[]>(this.findGameClient(game_id,client_id));
    }

  }

  findSearchFilter(game_id?: number, client_id?: number, fecha?:string): string {
    let para = '';
    fecha = this.conversion;
   
   
    if (game_id != null) {
      para += "game_id=" + game_id;
    }
   
    if (client_id != null) {
      if (para != '') para += "&";

      para += "client_id=" + client_id;

    }
    if (fecha != null) {
      if (para != '') para += "&";
      para += 'fecha=' + fecha;
    }
    let url = 'http://localhost:8080/load/searchAll'

    if (para == '') return url;
    else return url + '?' + para;

  }
 
  findSearchClientDate(client : number, fecha : string){
  let params ='';
   

  if(fecha != null){
  params += 'fecha=' + fecha;
  }
  if(client != null){
  if(params !='') params +="&";
  params +="client_id=" + client;
}
    let url = 'http://localhost:8080/load/findSearchClientDate'
    if (params == '') return url
    else return url + '?' + params; 

  
  }
  findGameDate(game: number, fecha: string) {
    let params = '';


    if (fecha != null) {
      params += 'fecha=' + fecha;
    }
    if (game != null) {
      if (params != '') params += "&";
      params += "client_id=" + game;
    }
    let url = 'http://localhost:8080/load/findGameDate'
    if (params == '') return url
    else return url + '?' + params;


  }
  findGameClient(game: number, client: number) {
    let params = '';


    if (game != null) {
      params += 'game=' + game;
    }
    if (client != null) {
      if (params != '') params += "&";
      params += "client=" + client;
    }
    let url = 'http://localhost:8080/load/findGameClient'
    if (params == '') return url
    else return url + '?' + params;


  }
  saveLoan(loan: Loan): Observable<Loan> {
    let url = 'http://localhost:8080/load';
    if (loan.id != null){
      url += '/' + loan.id;
    } 

  
      return this.http.put<Loan>(url, loan);

}
  deleteLoan(id: number): Observable<any> {
    return this.http.delete<void>('http://localhost:8080/load/' + id);
  }

   
  findDate(fecha?: String): string {
    let params = '';

    if (fecha != null) {
      params += "fecha=" + fecha;
    }


    let url = 'http://localhost:8080/load/searchDate/'

    if (params == '') return url;
    else return url + '?' + params;


  }

  seleccionarFecha(fecha: string){
   this.conversion = fecha;
   

  }

}
