import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Loan } from './model/Loan';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { LoanPage } from './model/LoanPage';
import { Pageable } from '../core/model/page/Pageable';

@Injectable({
  providedIn: 'root'
})


export class LoanService {
 
   conversion: string
  constructor(
    
    private http: HttpClient

  ) { }

  
   
  getLoan(game?: number, client?: number, fecha?:string, pageable?: Pageable) : Observable<LoanPage>{
 
    return this.http.post<LoanPage>(this.findSearchFilterPage(game,client,fecha,pageable), {pageable : pageable});
  }

  getLoanAll(): Observable<Loan[]> {
    return this.http.get<Loan[]>('http://localhost:8080/load');
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

   findSearchFilterPage(game: number, client: number, fecha: string,pageable: Pageable){
     let params = '';

     if (game != null){
       params += "game=" + game;
     }
     if (client != null) {
        if (params != '') params += "&";
       params += "client=" + client;

     }
     if (fecha != null){
       if(params !='') params += "&";
       params += 'fecha=' + fecha;
     }
     let url = 'http://localhost:8080/load/findSearchFilterPage/'

     if (params == '') return url;
     else return url + '?' + params;
   
   }
 

  seleccionarFecha(fecha: string){
   this.conversion = fecha;
   

  }

}
