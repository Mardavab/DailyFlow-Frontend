import { useContext } from "react";
import { SalesContext } from "../../context/sales/SalesContext";

export const SaleRow = ({ sale }) => {
  const { handlerSelectSaleForm, handlerRemoveSale } = useContext(SalesContext);

  return (
    <tr key={sale.id}>
      <td>{sale.id}</td>
      <td>
        $
        {Number(sale.amount).toLocaleString("es-CO", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td>{sale.paymentMethod}</td>
      <td>{sale.date}</td>
      <td>{sale.time}</td>
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
