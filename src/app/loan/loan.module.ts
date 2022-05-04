import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListComponent } from './loan-list/loan-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoanEditComponent } from './loan-edit/loan-edit.component';
import { MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MatOptionModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    LoanListComponent,
    LoanEditComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,

  
    
  ],
  providers :[
    {
    provide: MAT_DIALOG_DATA,
    useValue:{},
   
  },
//{
 // provide: LOCALE_ID,
 // useValue:'es',
//},

    [DatePipe],
    
    { provide: MAT_DATE_LOCALE, useValue: 'es' }
  ],
  exports: [
    
  ],
})
export class LoanModule { }
