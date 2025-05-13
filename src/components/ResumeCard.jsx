import PropTypes from 'prop-types';

export const ResumeCard = ({
  titulo,
  valor,
  icono,
  colorBorde,
  colorTexto,
  mostrarProgreso = false,
  porcentajeProgreso = 0
}) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card border-left-${colorBorde} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${colorTexto} text-uppercase mb-1`}>
                {titulo}
              </div>
              {mostrarProgreso ? (
                <div className="row no-gutters align-items-center">
                  <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{valor}</div>
                  </div>
                  <div className="col">
                    <div className="progress progress-sm mr-2">
                      <div 
                        className={`progress-bar bg-${colorTexto}`} 
                        role="progressbar"
                        style={{ width: `${porcentajeProgreso}%` }} 
                        aria-valuenow={porcentajeProgreso}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h5 mb-0 font-weight-bold text-gray-800">{valor}</div>
              )}
            </div>
            <div className="col-auto">
              <i className={`fas ${icono} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ResumeCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icono: PropTypes.string.isRequired,
  colorBorde: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']).isRequired,
  colorTexto: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']).isRequired,
  mostrarProgreso: PropTypes.bool,
  porcentajeProgreso: PropTypes.number
};