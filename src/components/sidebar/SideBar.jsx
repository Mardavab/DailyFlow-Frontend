import { NavItem } from "./NavItem";

export const SideBar = () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <div className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-rocket"></i>
        </div>
        <div className="sidebar-brand-text mx-3">DailyFlow</div>
      </div>

      <hr className="sidebar-divider my-0" />

      <NavItem 
        icon="fa-chart-pie" 
        title="Panel Principal" 
        isActive={true}
        to="/dashboard"
      />

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Operaciones</div>
      
      <NavItem 
        icon="fa-cash-register" 
        title="Ventas" 
        to="/sales"
      />
      
      <NavItem 
        icon="fa-receipt" 
        title="Gastos" 
        to="/expenses"
      />
      {/**
      <NavItem 
        icon="fa-users" 
        title="Clientes" 
        to="/customers"
      />
  	  */}
      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Productos</div>

      <NavItem 
        icon="fa-boxes" 
        title="Inventario" 
        to="/inventory"
      />
      
      <NavItem
        icon="fa-truck"
        title="Compras"
        isCollapsible={true}
        items={[
          { title: 'Proveedores', to: '/purchases/suppliers' },
          { title: 'Facturas', to: '/purchases/invoices' },

        ]}
      />


      <hr className="sidebar-divider d-none d-md-block" />

      <div className="sidebar-heading">Gestión</div>
      
      <NavItem
        icon="fa-shield-alt"
        title="Seguridad"
        isCollapsible={true}
        items={[
          { title: 'Usuarios', to: '/security/users' },
        ]}
      />

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};