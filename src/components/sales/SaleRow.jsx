import { useContext } from "react";
import { SalesContext } from "../../context/sales/SalesContext";

export const SaleRow = ({ sale }) => {
  const { handlerSelectSaleForm, handlerRemoveSale } = useContext(SalesContext);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    try {
      const date = new Date(`1970-01-01T${timeString}`);
      return date.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, 
      });
    } catch {
      return timeString; 
    }
  };

  return (
    <tr key={sale.id}>
      <td>
        $
        {Number(sale.amount).toLocaleString("es-CO", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </td>
      <td>{sale.paymentMethod}</td>
      <td>{sale.date}</td>
      <td>{formatTime(sale.time)}</td>
      <td>
        <ul className="mb-0">
          {sale.details?.map((det) => (
            <li key={det.id}>
              {det.product.name} x{det.quantity}
            </li>
          ))}
        </ul>
      </td>
      <td>
        <div style={{ display: "inline-block" }}>
          <button
            type="button"
            className="btn btn-info btn-circle"
            onClick={() => handlerSelectSaleForm(sale)}
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
        <div style={{ display: "inline-block", marginLeft: "5px" }}>
          <button
            type="button"
            className="btn btn-danger btn-circle"
            onClick={() => handlerRemoveSale(sale.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};
