import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { ReadInvoiceDTO } from '../../../models/invoice/read-invoice-dto';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-manage-invoice',
  imports: [RouterLink, CommonModule],
  templateUrl: './manage-invoice.component.html',
  styleUrl: './manage-invoice.component.css'
})
export class ManageInvoiceComponent implements OnInit {
  TotalPages: number = 0;
  CurrentPage: number = 0;
  PgSize: number = 10;
  InvoiceList!: ReadInvoiceDTO[];
  constructor(
    private alertServ: AlertService,
    private invoiceServ: InvoiceService
  ) { }
  ngOnInit() {
    this.initializeList();
  }
  private initializeList() {
    this.alertServ.loading();
    this.invoiceServ.GetTotalPages(this.PgSize).subscribe({
      next: (res) => {
        if (res.data) {
          this.TotalPages = res.data;
          this.CurrentPage = 1;
          this.initializePagination();
        }
        this.alertServ.close();
      },
      error: (err) => {
        this.alertServ.close();
        this.alertServ.error(err.message, 'Server Error');
      }
    })
  }
  private initializePagination() {
    this.invoiceServ.GetAllPaginatedAsync(this.PgSize, this.CurrentPage).subscribe({
      next: (res) => {
        if (res.data) {
          this.InvoiceList = res.data
        };
        this.alertServ.close();
      },
      error: (err) => {
        this.alertServ.close();
        this.alertServ.error(err.message, 'Server Error');
      }
    })
  }
  confirmDelete(id: number) {
    this.alertServ.confirm('Are You Sure About Delete Selected Invoice ?', 'Invoice Delete').then((response) => {
      if (response) {
        this.invoiceServ.DeleteAsync(id).subscribe({
          next: (res) => {
            this.alertServ.close();
            this.alertServ.success(res.message, 'Server Success')
            this.initializeList();
          },
          error: (err) => {
            this.alertServ.close();
            this.alertServ.error(err.message, 'Server Error');
          }
        })
      }
    })
  }
  prevPage() {
    if (this.CurrentPage > 1)
      this.CurrentPage--;
    this.initializePagination();
  }
  nextPage() {
    if (this.CurrentPage < this.TotalPages)
      this.CurrentPage++;
    this.initializePagination();
  }
}
