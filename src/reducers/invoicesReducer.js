export const invoicesReducer = (state = [], action) => {
  switch (action.type) {
    case 'addInvoice':
      return [
        ...state,
        {
          ...action.payload,
          id: action.payload.id || new Date().getTime(),
          fechaEmision: action.payload.fechaEmision || new Date().toISOString().split('T')[0],
          estado: 'pendiente',
          saldoPendiente: action.payload.total || 0,
          pagos: [],
          items: action.payload.items || []
        }
      ];

    case 'removeInvoice':
      return state.filter(invoice => invoice.id !== action.payload);

    case 'updateInvoice':
      return state.map(inv => {
        if (inv.id === action.payload.id) {
          const items = action.payload.items || inv.items || [];
          const total = items.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
          const totalPagado = inv.pagos.reduce((sum, pago) => sum + pago.monto, 0);
          const saldoPendiente = total - totalPagado;
          const estado = saldoPendiente <= 0 ? 'pagada' : 
                        saldoPendiente < total ? 'parcial' : 'pendiente';

          return {
            ...inv,
            ...action.payload,
            items,
            total,
            saldoPendiente,
            estado,
            fechaEmision: action.payload.fechaEmision || inv.fechaEmision
          };
        }
        return inv;
      });

    case 'addInvoiceItem':
      return state.map(invoice => {
        if (invoice.id === action.payload.invoiceId) {
          const newItem = {
            ...action.payload.item,
            id: action.payload.item.id || new Date().getTime()
          };
          const items = [...(invoice.items || []), newItem];
          const total = items.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
          const saldoPendiente = total - invoice.pagos.reduce((sum, pago) => sum + pago.monto, 0);
          const estado = saldoPendiente <= 0 ? 'pagada' : 
                        saldoPendiente < total ? 'parcial' : 'pendiente';

          return {
            ...invoice,
            items,
            total,
            saldoPendiente,
            estado
          };
        }
        return invoice;
      });

    case 'removeInvoiceItem':
      return state.map(invoice => {
        if (invoice.id === action.payload.invoiceId) {
          const items = invoice.items.filter(item => item.id !== action.payload.itemId);
          const total = items.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
          const saldoPendiente = total - invoice.pagos.reduce((sum, pago) => sum + pago.monto, 0);
          const estado = saldoPendiente <= 0 ? 'pagada' : 
                        saldoPendiente < total ? 'parcial' : 'pendiente';

          return {
            ...invoice,
            items,
            total,
            saldoPendiente,
            estado
          };
        }
        return invoice;
      });

    case 'addPayment':
      return state.map(invoice => {
        if (invoice.id === action.payload.invoiceId) {
          const nuevoPago = {
            id: action.payload.pago.id || Date.now(),
            fecha: action.payload.pago.fecha || new Date().toISOString().split('T')[0],
            monto: action.payload.pago.monto,
            metodo: action.payload.pago.metodo,
            referencia: action.payload.pago.referencia || ''
          };
          
          const pagosActualizados = [...invoice.pagos, nuevoPago];
          const totalPagado = pagosActualizados.reduce((sum, p) => sum + p.monto, 0);
          const saldoPendiente = invoice.total - totalPagado;
          const nuevoEstado = saldoPendiente <= 0 ? 'pagada' : 
                            totalPagado > 0 ? 'parcial' : 'pendiente';
          
          return {
            ...invoice,
            pagos: pagosActualizados,
            saldoPendiente,
            estado: nuevoEstado
          };
        }
        return invoice;
      });

    case 'removePayment':
      return state.map(invoice => {
        if (invoice.id === action.payload.invoiceId) {
          const pagosActualizados = invoice.pagos.filter(p => p.id !== action.payload.paymentId);
          const totalPagado = pagosActualizados.reduce((sum, p) => sum + p.monto, 0);
          const saldoPendiente = invoice.total - totalPagado;
          const nuevoEstado = saldoPendiente <= 0 ? 'pagada' : 
                            totalPagado > 0 ? 'parcial' : 'pendiente';
          
          return {
            ...invoice,
            pagos: pagosActualizados,
            saldoPendiente,
            estado: nuevoEstado
          };
        }
        return invoice;
      });

    default:
      return state;
  }
};