import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardContent } from "../components/DashboardContent";
import { UsersContent } from "../components/users/UsersContent";
import { SaleContent } from "../components/sales/SaleContent";
import { SideBar } from "../components/sidebar/SideBar";
import { TopNavbar } from "../components/sidebar/TopNavbar";
import { UserProvider } from "../Content/User/UserProvider";
import { SalesProvider } from "../Content/sales/SalesProvider";
import { ExpenseProvider } from "../Content/expense/ExpenseProvider";

import { ExpenseContent } from "../components/expense/ExpenseContent";

import { SupplierProvider } from "../Content/Supplier/SupplierProvider ";
import { SuppliersContent } from "../components/suppliers/SuppliersContent";
import { InvoiceProvider } from "../Context/Invoice/InvoiceContent";
import { InvoicesContent } from "../components/inovices/InvoicesContent";
import { ProductProvider } from "../Content/product/ProductProvider";
import { ProductsContent } from "../components/product/ProductsContent";

export const UserRoutes = () => {
  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <SideBar />
          <div id="Content-wrapper" className="d-flex flex-column">
            <div id="Content">
              <UserProvider>
                <SalesProvider>
                  <ExpenseProvider>
                    
                      <SupplierProvider>
                        <InvoiceProvider>
                          <ProductProvider>
                            <TopNavbar />
                            <Routes>
                              <Route
                                path="dashboard"
                                element={<DashboardContent />}
                              />
                              <Route
                                path="/expenses"
                                element={<ExpenseContent />}
                              />
                              <Route
                                path="/security/users"
                                element={<UsersContent />}
                              />
                              
                              <Route
                                path="/purchases/invoices"
                                element={<InvoicesContent />}
                              />
                              <Route
                                path="/purchases/suppliers"
                                element={<SuppliersContent />}
                              />
                              <Route
                                path="/inventory"
                                element={<ProductsContent/>}
                              />
                              <Route path="/sales" element={<SaleContent />} />
                              <Route
                                path="/"
                                element={<Navigate to="/dashboard" />}
                              />
                            </Routes>
                          </ProductProvider>
                        </InvoiceProvider>
                      </SupplierProvider>
                    
                  </ExpenseProvider>
                </SalesProvider>
              </UserProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
