import { Routes } from '@angular/router';
import { ManageCashierComponent } from './components/Cashier/manage-cashier/manage-cashier.component';
import { CashierDetailsComponent } from './components/Cashier/cashier-details/cashier-details.component';
import { ManageInvoiceComponent } from './components/Invoice/manage-invoice/manage-invoice.component';
import { InvoiceDetailsComponent } from './components/Invoice/invoice-details/invoice-details.component';

export const routes: Routes = [
    {path:'',redirectTo:'Dashboard/ManageCashiers',pathMatch:'full'},
    {path:'Dashboard/ManageCashiers',component:ManageCashierComponent},
    {path:'Dashboard/CashierDetails/:id',component:CashierDetailsComponent},
    {path:'Dashboard/ManageInvoices',component:ManageInvoiceComponent},
    {path:'Dashboard/InvoiceDetails/:id',component:InvoiceDetailsComponent},
    {path:'**',redirectTo:'Dashboard/ManageCashiers',pathMatch:'full'},
];
