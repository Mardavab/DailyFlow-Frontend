import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardContent } from "../components/DashboardContent";
import { UsersContent } from "../components/users/UsersContent";
import { SaleContent } from "../components/sales/SaleContent";
import { SideBar } from "../components/sidebar/SideBar";
import { TopNavbar } from "../components/sidebar/TopNavbar";
import { UserProvider } from "../context/User/UserProvider";
import { SalesProvider } from "../context/sales/SalesProvider";
import { ExpenseProvider } from "../context/expense/ExpenseProvider";
import { RoleProvider } from "../context/role/RoleProvider";
import { ExpenseContent } from "../components/expense/ExpenseContent";
import { RolesContent } from "../components/role/RolesContent";
import { SupplierProvider } from "../context/Supplier/SupplierProvider ";
import { SuppliersContent } from "../components/suppliers/SuppliersContent";
import { InvoiceProvider } from "../context/Invoice/InvoiceProvider";
import { InvoicesContent } from "../components/inovices/InvoicesContent";
import { ProductProvider } from "../context/product/ProductProvider";
import { ProductsContent } from "../components/product/ProductsContent";

export const UserRoutes = () => {
  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <SideBar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <UserProvider>
                <SalesProvider>
                  <ExpenseProvider>
                    <RoleProvider>
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
                                path="/security/roles"
                                element={<RolesContent />}
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
                    </RoleProvider>
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
