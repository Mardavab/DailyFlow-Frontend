import { ResumeCard } from "./ResumeCard";
import { useDashboard } from "../hooks/useDashboard";
import { Spinner } from "../components/Spinner"; // Opcional, usa tu propio spinner
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ["#007bff", "#28a745", "#17a2b8", "#ffc107", "#dc3545"];

export const DashboardContent = () => {
  const { summary, loading, error } = useDashboard();

  if (loading) {
    return <Spinner message="Cargando el panel..." />;
  }
  if (error) return <div className="alert alert-danger">Error cargando dashboard</div>;
  if (!summary) return null;

  // Prepara los datos para los gráficos
  const areaData = (summary.incomeSummary || []).map((amount, i) => ({
    mes: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][i],
    ingresos: amount,
  }));

  const pieData = Object.entries(summary.incomeSources || {}).map(([source, value]) => ({
    name: "Ventas", value
  }));

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Panel Principal</h1>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="row">
        <ResumeCard
          titulo="Ingresos (Mensuales)"
          valor={summary.monthlyIncome?.toLocaleString("es-CO", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
          icono="fa-calendar"
          colorBorde="primary"
          colorTexto="primary"
        />

        <ResumeCard
          titulo="Ingresos (Anuales)"
          valor={summary.annualIncome?.toLocaleString("es-CO", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
          icono="fa-dollar-sign"
          colorBorde="success"
          colorTexto="success"
        />

        <ResumeCard
          titulo="Tareas"
          valor={Math.round(summary.tasksProgress * 100) + "%"}
          icono="fa-clipboard-list"
          colorBorde="info"
          colorTexto="info"
          mostrarProgreso={true}
          porcentajeProgreso={Math.round(summary.tasksProgress * 100)}
        />

        <ResumeCard
          titulo="Solicitudes Pendientes"
          valor={summary.pendingRequests}
          icono="fa-comments"
          colorBorde="warning"
          colorTexto="warning"
        />
      </div>

      {/* Gráficos */}
      <div className="row">
        {/* Gráfico de Área */}
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Resumen de Ingresos
              </h6>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorIng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007bff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="ingresos" stroke="#007bff" fillOpacity={1} fill="url(#colorIng)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Gráfico de Pastel */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Fuentes de Ingresos
              </h6>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
