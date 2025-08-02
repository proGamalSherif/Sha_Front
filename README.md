# 🏢 ElShrouk Academy Hiring Task - Frontend  
  
> Angular 19 frontend application for cashier and invoice management system  
  
**Live Demo**: [https://sha-front.vercel.app](https://sha-front.vercel.app)  
  
## 📋 Overview  
  
This is the frontend application for the ElShrouk Academy hiring task, providing a comprehensive management system for cashiers and invoices. The application features a responsive design with full CRUD operations for both cashier and invoice management.  
  
## ✨ Key Features  
  
### Cashier Management  
- Create, update, and delete cashiers  
- Hierarchical relationship management (City → Branch → Cashier)  
- Search and pagination functionality  
- Responsive data table interface  
  
### Invoice Management    
- Create and edit invoices with dynamic line items  
- Associate invoices with cashiers and branches  
- Advanced search and filtering capabilities  
- Pagination support for large datasets  
- Real-time form validation  
  
### Technical Features  
- Reactive forms with dynamic FormArrays  
- Observable-based HTTP client integration  
- Responsive UI design using Bootstrap  
- User-friendly alerts and confirmations with SweetAlert2  
- Comprehensive error handling and loading states  
  
## 🛠 Technologies Used  
  
- **Framework**: Angular 19  
- **Languages**: TypeScript, HTML, CSS  
- **UI Library**: Bootstrap 5  
- **HTTP Client**: Angular HttpClient with Observables  
- **Alerts**: SweetAlert2  
- **Forms**: Angular Reactive Forms  
- **Deployment**: Vercel  
  
## 🏗 Architecture  
  
The application follows Angular best practices with:  
- Component-service separation  
- Reactive forms for complex data entry  
- Observable-based data flow  
- Consistent CRUD operation patterns  
- Hierarchical data relationships  
  
## ⚙️ Getting Started  
  
```bash  
git clone https://github.com/proGamalSherif/Sha_Front.git  
cd Sha_Front  
npm install  
ng serve
```

Then open your browser at http://localhost:4200/.

## 🌐 API Integration
The frontend connects to the backend API at sha-backend.runasp.net/api with endpoints for:

/Cashier - Cashier CRUD operations
/Invoice - Invoice CRUD operations
/Branch - Branch data retrieval
/City - City data retrieval

## 📱 Features Overview
Cashier Management
List View: Paginated table with search functionality
Detail View: Form for creating/editing cashiers with city-branch hierarchy
Operations: Full CRUD with confirmation dialogs

## Invoice Management
List View: Advanced filtering and pagination
Detail View: Complex form with dynamic invoice line items
Operations: Create, update, delete with comprehensive validation
## 🎯 Usage
Manage Cashiers: Navigate to cashier management to add, edit, or remove cashiers
Manage Invoices: Create invoices with multiple line items and assign to cashiers
Search & Filter: Use built-in search functionality to find specific records
Responsive Design: Access from any device with optimized mobile experience
