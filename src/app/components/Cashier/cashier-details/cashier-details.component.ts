import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../services/city/city.service';
import { BranchService } from '../../../services/branch/branch.service';
import { CashierService } from '../../../services/cashier/cashier.service';
import { AlertService } from '../../../services/alert/alert.service';
import { ReadCityDTO } from '../../../models/city/read-city-dto';
import { CommonModule } from '@angular/common';
import { ReadBranchDTO } from '../../../models/branch/read-branch-dto';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReadCashierDTO } from '../../../models/cashier/read-cashier-dto';
import { InsertCashierDTO } from '../../../models/cashier/insert-cashier-dto';
import { UpdateCashierDTO } from '../../../models/cashier/update-cashier-dto';

@Component({
  selector: 'app-cashier-details',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cashier-details.component.html',
  styleUrl: './cashier-details.component.css'
})
export class CashierDetailsComponent implements OnInit {
  CityList!: ReadCityDTO[];
  BranchList!: ReadBranchDTO[];
  CashierForm!: FormGroup;
  CashierEntity!: ReadCashierDTO;
  CashierId!: number;
  constructor(
    private cityServ: CityService,
    private branchServ: BranchService,
    private cashierServ: CashierService,
    private alertServ: AlertService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.route.paramMap.subscribe((value) => {
      this.CashierId = Number(value.get('id'));
    })
  }
  ngOnInit() {
    this.initializeCities();
    this.initializeForm();
    this.initializeCashierEntity();
  }
  private initializeCities() {
    this.alertServ.loading();
    this.cityServ.GetAllAsync().subscribe({
      next: (res) => {
        this.CityList = res.data ?? [];
        this.alertServ.close();
      },
      error: (err) => {
        this.alertServ.close();
        this.alertServ.error(err.message, 'Server Error')
      }
    })
  }
  cityChanged(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue !== "null") {
      this.alertServ.loading();
      this.branchServ.GetAllByCityId(Number(selectedValue)).subscribe({
        next: (res) => {
          this.BranchList = res.data ?? [];
          this.alertServ.close();
        },
        error: (err) => {
          this.alertServ.close();
          this.alertServ.error(err.message, 'Server Error');
        }
      })
    }
  }
  private initializeForm() {
    this.CashierForm = this.fb.group({
      cashierName: [null, Validators.required],
      branchID: [null, Validators.required],
      cityID: [null, Validators.required]
    })
  }
  private initializeCashierEntity() {
    if (this.CashierId && this.CashierId > 0) {
      this.alertServ.loading();
      this.cashierServ.GetByIdAsync(this.CashierId).subscribe({
        next: (res) => {
          this.CashierEntity = res.data ?? {
            id: 0,
            cashierName: '',
            branchName: '',
            branchID: 0,
            cityId: 0,
            cityName: '',
          };

          // Step 1: Patch cashier name and cityID
          this.CashierForm.patchValue({
            cashierName: this.CashierEntity.cashierName,
            cityID: this.CashierEntity.cityId
          });

          // Step 2: Load branches for that city
          this.branchServ.GetAllByCityId(this.CashierEntity.cityId).subscribe({
            next: (res) => {
              this.BranchList = res.data ?? [];

              // Step 3: Patch the branchID only after branches are loaded
              this.CashierForm.patchValue({
                branchID: this.CashierEntity.branchID
              });

              this.alertServ.close();
            },
            error: (err) => {
              this.alertServ.close();
              this.alertServ.error(err.message, 'Server Error');
            }
          });
        },
        error: (err) => {
          this.alertServ.close();
          this.alertServ.error(err.message, 'Server Error');
        }
      });
    }
  }
  submitForm(){
    if(this.CashierForm.valid){
      if(this.CashierId > 0){
        //Update
        let entity:UpdateCashierDTO={
          cashierName : this.CashierForm.get('cashierName')?.value,
          branchID:this.CashierForm.get('branchID')?.value,
          id:this.CashierId
        };
        this.cashierServ.UpdateAsync(entity).subscribe({
          next:(res)=>{
            this.alertServ.close();
            this.alertServ.success(res.message,'Server Success')
            this.router.navigate(['/Dashboard/ManageCashiers'])
          },
          error:(err)=>{
            this.alertServ.close();
            this.alertServ.error(err.message,'Server Error');
          }
        })
      }else{
        //Insert
        let entity:InsertCashierDTO={
          cashierName : this.CashierForm.get('cashierName')?.value,
          branchID:this.CashierForm.get('branchID')?.value,
        };
        this.cashierServ.AddAsync(entity).subscribe({
          next:(res)=>{
            this.alertServ.close();
            this.alertServ.success(res.message,'Server Success')
            this.router.navigate(['/Dashboard/ManageCashiers'])
          },
          error:(err)=>{
            this.alertServ.close();
            this.alertServ.error(err.message,'Server Error');
          }
        })
      }
    }else{
      this.alertServ.error('Please Fill All Required Data','Form Validation Error')
    }
  }
}
