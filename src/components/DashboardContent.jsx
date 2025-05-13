import { ResumeCard } from "./ResumeCard";

export const DashboardContent = () => {
  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Panel Principal</h1>
        <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <i className="fas fa-download fa-sm text-white-50 mr-2"></i>
          Generar Reporte
        </button>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="row">
        <ResumeCard
          titulo="Ingresos (Mensuales)"
          valor="$40,000"
          icono="fa-calendar"
          colorBorde="primary"
          colorTexto="primary"
        />

        <ResumeCard
          titulo="Ingresos (Anuales)"
          valor="$215,000"
          icono="fa-dollar-sign"
          colorBorde="success"
          colorTexto="success"
        />

        <ResumeCard
          titulo="Tareas"
          valor="50%"
          icono="fa-clipboard-list"
          colorBorde="info"
          colorTexto="info"
          mostrarProgreso={true}
          porcentajeProgreso={50}
        />

        <ResumeCard
          titulo="Solicitudes Pendientes"
          valor="18"
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
              <div className="chart-area">
                <canvas id="myAreaChart"></canvas>
              </div>
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
              <div className="chart-pie pt-4 pb-2">
                <canvas id="myPieChart"></canvas>
              </div>
              <div className="mt-4 text-center small">
                <span className="mr-2">
                  <i className="fas fa-circle text-primary"></i> Directos
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-success"></i> Sociales
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-info"></i> Referidos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
