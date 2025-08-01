import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReadInvoiceDTO } from '../../../models/invoice/read-invoice-dto';
import { AlertService } from '../../../services/alert/alert.service';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReadCashierDTO } from '../../../models/cashier/read-cashier-dto';
import { CashierService } from '../../../services/cashier/cashier.service';
import { CommonModule } from '@angular/common';
import { ReadBranchDTO } from '../../../models/branch/read-branch-dto';
import { InsertInvoiceDetailsDTO, InsertInvoiceDTO } from '../../../models/invoice/insert-invoice-dto';
import { UpdateInvoiceDTO } from '../../../models/invoice/update-invoice-dto';

@Component({
  selector: 'app-invoice-details',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent implements OnInit {
  InvoiceForm!: FormGroup;
  InvoiceEntity!: ReadInvoiceDTO;
  EntityId!: number;
  CashierList!: ReadCashierDTO[];
  BranchList: ReadBranchDTO[] = [];
  constructor(
    private alertServ: AlertService,
    private invoiceServ: InvoiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cashierServ: CashierService
  ) { }
  ngOnInit() {
    this.route.paramMap.subscribe((value) => {
      this.EntityId = Number(value.get('id'));
    })
    this.initializeCashier();
    this.initializeForm();
    this.initializeEntity();
  }
  private initializeCashier() {
    this.cashierServ.GetAllAsync().subscribe({
      next: (res) => {
        if (res.data) {
          this.CashierList = res.data;
        }
      }
    })
  }
  private initializeForm() {
    this.InvoiceForm = this.fb.group({
      customerName: [null, Validators.required],
      cashierID: [null, Validators.required],
      branchID: [null, Validators.required],
      invoiceDetails: this.fb.array([])
    })
  }
  private initializeEntity() {
    this.alertServ.loading();
    if (this.EntityId) {
      if (this.EntityId > 0) {
        this.invoiceServ.GetByIdAsync(this.EntityId).subscribe({
          next: (res) => {
            if (res.data) {
              this.InvoiceEntity = res.data
              this.InvoiceForm.patchValue({
                customerName: this.InvoiceEntity.customerName,
                cashierID: this.InvoiceEntity.cashierID,
              });
              if (this.InvoiceEntity) {
                let cashierEntity = this.CashierList.find(c => c.id == this.InvoiceEntity.cashierID)
                if (cashierEntity) {
                  let newBranch: ReadBranchDTO = {
                    id: cashierEntity?.branchID ?? 0,
                    branchName: cashierEntity?.branchName ?? '',
                  }
                  this.BranchList = [];
                  this.BranchList.push(newBranch)
                  this.InvoiceForm.patchValue({
                    branchID: this.InvoiceEntity.branchID
                  })
                }
                this.InvoiceEntity.invoiceDetails.forEach((item) => {
                  this.addItemToArray(item);
                })
              }
            }
            this.alertServ.close();
          },
          error: (err) => {
            this.alertServ.close();
            this.alertServ.error(err.message, 'Server Error');
          }
        })
      } else {
        this.alertServ.close();
      }
    } else {
      this.alertServ.close();
    }
  }
  addItemToArray(item: any) {
    this.invoiceDetails.push(this.buildInvoiceItem(item));
  }
  addEmptyItemToArray() {
    this.invoiceDetails.push(this.buildInvoiceItem());
  }
  private buildInvoiceItem(item: any = null): FormGroup {
    return this.fb.group({
      invoiceHeaderID: [item?.invoiceHeaderID ?? null],
      itemName: [item?.itemName ?? null, Validators.required],
      itemCount: [item?.itemCount ?? null, Validators.required],
      itemPrice: [item?.itemPrice ?? null, Validators.required],
    });
  }
  get invoiceDetails(): FormArray {
    return this.InvoiceForm.get('invoiceDetails') as FormArray;
  }
  cashierChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue !== "null") {
      let tempEntity = this.CashierList.find(c => c.id == Number(selectedValue))
      if (tempEntity) {
        let newBranch: ReadBranchDTO = {
          id: tempEntity?.branchID ?? 0,
          branchName: tempEntity?.branchName ?? '',
        }
        this.BranchList = [];
        this.BranchList.push(newBranch)
      }

    }
  }
  removeItem(index: number) {
    this.invoiceDetails.removeAt(index);
  }
  removeAll() {
    this.alertServ.confirm('Clear All Items', 'Confirm Remove All').then((response) => {
      if (response) {
        this.invoiceDetails.clear();
      }
    })
  }
  submitForm() {
    if (this.InvoiceForm.valid) {
      if (this.invoiceDetails.length > 0) {
        if (this.EntityId > 0) {
          this.UpdateEntity()
        } else {
          this.InsertEntity();
        }
      } else {
        this.alertServ.error('You Should At least add 1 item to invoice before procced', 'Item List Error')
      }
    } else {
      this.alertServ.error('Please Fill All Required Data', 'Form Validation Error');
    }
  }
  private InsertEntity() {
    this.alertServ.loading();
    let entity: InsertInvoiceDTO = {
      customerName: this.InvoiceForm.get('customerName')?.value,
      cashierID: this.InvoiceForm.get('cashierID')?.value,
      branchID: this.InvoiceForm.get('branchID')?.value,
      invoiceDetails: this.InvoiceForm.get('invoiceDetails')?.value,
    }
    let itemList: InsertInvoiceDetailsDTO[] = [];
    this.invoiceDetails.controls.forEach((item) => {
      let itemEntities: InsertInvoiceDetailsDTO = {
        itemName: item.get('itemName')?.value,
        itemCount: Number(item.get('itemCount')?.value),
        itemPrice: Number(item.get('itemPrice')?.value),
      }
      itemList.push(itemEntities)
    })
    entity.invoiceDetails = itemList
    this.invoiceServ.AddAsync(entity).subscribe({
      next: (res) => {
        this.alertServ.close();
        this.alertServ.success(res.message, 'Server Success');
      },
      error: (err) => {
        this.alertServ.close();
        this.alertServ.error(err.message, 'Server Error');
      }
    })
  }
  private UpdateEntity() {
    this.alertServ.loading();
    let entity: UpdateInvoiceDTO = {
      customerName: this.InvoiceForm.get('customerName')?.value,
      cashierID: this.InvoiceForm.get('cashierID')?.value,
      branchID: this.InvoiceForm.get('branchID')?.value,
      invoiceDetails: this.InvoiceForm.get('invoiceDetails')?.value,
      id: this.EntityId
    };
    let itemList: InsertInvoiceDetailsDTO[] = [];
    this.invoiceDetails.controls.forEach((item) => {
      let itemEntities: InsertInvoiceDetailsDTO = {
        itemName: item.get('itemName')?.value,
        itemCount: Number(item.get('itemCount')?.value),
        itemPrice: Number(item.get('itemPrice')?.value),
      }
      itemList.push(itemEntities)
    })
    entity.invoiceDetails = itemList
    this.invoiceServ.UpdateAsync(entity).subscribe({
      next: (res) => {
        this.alertServ.close();
        this.alertServ.success(res.message, 'Server Success');
      },
      error: (err) => {
        this.alertServ.close();
        this.alertServ.error(err.message, 'Server Error');
      }
    })
  }
}
