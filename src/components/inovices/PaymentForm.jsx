import { useState, useContext } from 'react';
import { InvoiceContext } from '../../context/Invoice/InvoiceContext';
import Swal from 'sweetalert2';

export const PaymentForm = ({ invoice, onClose }) => {
    
  const { handlerAddPayment } = useContext(InvoiceContext);
  const [pago, setPago] = useState({
    fecha: new Date().toISOString().split('T')[0],
    monto: invoice.saldoPendiente > 0 ? invoice.saldoPendiente : 0,
    metodo: 'transferencia',
    referencia: '',
    nota: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Las validaciones ya están incluidas en handlerAddPayment
      await handlerAddPayment(invoice.id, pago);
      
      Swal.fire({
        title: 'Pago registrado',
        text: 'El pago se ha registrado correctamente',
        icon: 'success',
        timer: 2000
      });
      
      onClose();
    } catch (error) {
      // Los errores ya son manejados por el hook useInvoices
      console.error('Error al registrar pago:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPago(prev => ({
      ...prev,
      [name]: name === 'monto' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="payment-form p-4 border rounded bg-white" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 text-primary">
          <i className="fas fa-money-bill-wave mr-2"></i>
          Registrar Pago - Factura #{invoice.numeroFactura}
        </h5>
        <button 
          type="button" 
          className="close" 
          onClick={onClose}
          disabled={isSubmitting}
        >
          <span>&times;</span>
        </button>
      </div>

      <div className="mb-4 p-3 bg-light rounded">
        <div className="row">
          <div className="col-md-4">
            <p className="mb-1 text-muted">Total Factura</p>
            <p className="h5 font-weight-bold">{formatCurrency(invoice.total)}</p>
          </div>
          <div className="col-md-4">
            <p className="mb-1 text-muted">Pagado</p>
            <p className="h5 font-weight-bold text-success">
              {formatCurrency(invoice.total - invoice.saldoPendiente)}
            </p>
          </div>
          <div className="col-md-4">
            <p className="mb-1 text-muted">Saldo Pendiente</p>
            <p className={`h5 font-weight-bold ${
              invoice.saldoPendiente > 0 ? 'text-danger' : 'text-success'
            }`}>
              {formatCurrency(invoice.saldoPendiente)}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Fecha de Pago <span className="text-danger">*</span></label>
            <input
              type="date"
              className="form-control"
              name="fecha"
              value={pago.fecha}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group col-md-6">
            <label>Monto <span className="text-danger">*</span></label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                className="form-control"
                name="monto"
                min="0.01"
                max={invoice.saldoPendiente}
                step="0.01"
                value={pago.monto}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <small className="form-text text-muted">
              Máximo: {formatCurrency(invoice.saldoPendiente)}
            </small>
          </div>
        </div>

        <div className="form-group">
          <label>Método de Pago <span className="text-danger">*</span></label>
          <select
            className="form-control"
            name="metodo"
            value={pago.metodo}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          >
            <option value="transferencia">Transferencia bancaria</option>
            <option value="efectivo">Efectivo</option>
            <option value="cheque">Cheque</option>
            <option value="tarjeta">Tarjeta crédito/débito</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Referencia/N° Comprobante</label>
          <input
            type="text"
            className="form-control"
            name="referencia"
            value={pago.referencia}
            onChange={handleInputChange}
            disabled={isSubmitting}
            placeholder="N° de transacción, cheque, etc."
          />
        </div>


        <div className="d-flex justify-content-end mt-4">
          <button 
            type="button" 
            className="btn btn-secondary mr-2" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                Procesando...
              </>
            ) : (
              'Registrar Pago'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Función auxiliar para formato de moneda
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(amount);
};