import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardContext } from "../components/DashboardContext";
import { UsersContext } from "../components/users/UsersContext";
import { SaleContext } from "../components/sales/SaleContext";
import { SideBar } from "../components/sidebar/SideBar";
import { TopNavbar } from "../components/sidebar/TopNavbar";
import { UserProvider } from "../context/User/UserProvider";
import { SalesProvider } from "../context/sales/SalesProvider";
import { ExpenseProvider } from "../context/expense/ExpenseProvider";

import { ExpenseContext } from "../components/expense/ExpenseContext";

import { SupplierProvider } from "../context/Supplier/SupplierProvider ";
import { SuppliersContext } from "../components/suppliers/SuppliersContext";
import { InvoiceProvider } from "../context/Invoice/InvoiceContext";
import { InvoicesContext } from "../components/inovices/InvoicesContext";
import { ProductProvider } from "../context/product/ProductProvider";
import { ProductsContext } from "../components/product/ProductsContext";

export const UserRoutes = () => {
  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <SideBar />
          <div id="Context-wrapper" className="d-flex flex-column">
            <div id="Context">
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
                                element={<DashboardContext />}
                              />
                              <Route
                                path="/expenses"
                                element={<ExpenseContext />}
                              />
                              <Route
                                path="/security/users"
                                element={<UsersContext />}
                              />
                              
                              <Route
                                path="/purchases/invoices"
                                element={<InvoicesContext />}
                              />
                              <Route
                                path="/purchases/suppliers"
                                element={<SuppliersContext />}
                              />
                              <Route
                                path="/inventory"
                                element={<ProductsContext/>}
                              />
                              <Route path="/sales" element={<SaleContext />} />
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
