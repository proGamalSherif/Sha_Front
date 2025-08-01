import { Component, OnInit } from '@angular/core';
import { ReadCashierDTO } from '../../../models/cashier/read-cashier-dto';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../services/alert/alert.service';
import { CashierService } from '../../../services/cashier/cashier.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-cashier',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './manage-cashier.component.html',
  styleUrl: './manage-cashier.component.css'
})
export class ManageCashierComponent implements OnInit {
  CashierList!: ReadCashierDTO[]
  TotalPages: number = 0;
  CurrentPage: number = 0;
  PgSize: number = 10;
  SearchText: string = '';
  constructor(
    private alertServ: AlertService,
    private cashierServ: CashierService
  ) { }
  ngOnInit(): void {
    this.initializelist();
  }
  private initializelist() {
    this.alertServ.loading();
    this.cashierServ.GetTotalPages(this.PgSize).subscribe({
      next: (res) => {
        this.TotalPages = res.data ?? 0;
        this.alertServ.close();
        if (this.TotalPages > 0) {
          this.alertServ.loading();
          this.CurrentPage = 1;
          this.initalizeData();
        }
      },
      error: () => {
        this.TotalPages = 0;
        this.CurrentPage = 0;
      }
    })
  }
  confirmDelete(id: number) {
    this.alertServ.confirm('Are you sure about delete current cashier ?', 'Cashier Delete').then((res) => {
      if (res) {
        this.alertServ.loading();
        this.cashierServ.DeleteAsync(id).subscribe({
          next: (res) => {
            this.initializelist();
          },
          error: (err) => {
            console.log(err)
            this.alertServ.close()
            this.alertServ.error(err.error, 'Server Error');
          }
        })
      }
    })
  }
  prevPage() {
    if (this.CurrentPage > 1)
      this.CurrentPage--;
    this.initalizeData();
  }
  nextPage() {
    if (this.CurrentPage < this.TotalPages)
      this.CurrentPage++;
    this.initalizeData();
  }
  private initalizeData() {
    this.cashierServ.GetAllPaginatedAsync(this.PgSize, this.CurrentPage).subscribe({
      next: (res) => {
        this.CashierList = res.data ?? [];
        this.alertServ.close();
      },
      error: (err) => {
        this.alertServ.close();
        this.alertServ.error(err.error.message, 'Server Error');
      }
    })
  }
  applySearch() {
    if (this.SearchText) {
      //Filter
      console.log(this.SearchText);
      this.alertServ.loading();
      this.cashierServ.GetTotalFilteredPages(this.PgSize, this.SearchText).subscribe({
        next: (res) => {
          if (res.data) {
            this.TotalPages = res.data
            this.CurrentPage = 1;
            this.alertServ.close();
            this.alertServ.loading();
            this.cashierServ.GetFilteredPaginatedAsync(this.PgSize, this.CurrentPage, this.SearchText).subscribe({
              next: (res) => {
                if (res.data) {
                  this.CashierList = res.data;
                }
                this.alertServ.close();
              },
              error:(err)=>{
                this.alertServ.close();
                this.alertServ.error(err.message,'Server Error');
              }
            })
          }
          this.alertServ.close();
        },
        error: (err) => {
          this.alertServ.close();
          this.alertServ.error(err.message, 'Server Error');
        }
      })
    } else {
      // All
      this.initializelist();
    }
  }
}
