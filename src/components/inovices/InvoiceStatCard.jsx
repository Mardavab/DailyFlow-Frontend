export const StatCard = ({ icon, value, label, color, secondaryValue }) => (
    <div className={`bg-${color} rounded p-3 text-white mx-1`}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h4 className="mb-0 font-weight-bold">
            <i className={`fas fa-${icon} mr-2`}></i>
            {value}
          </h4>
          <small className="text-white-50">{label}</small>
        </div>
        {secondaryValue && (
          <div className="text-end">
            <small className="d-block">{secondaryValue}</small>
          </div>
        )}
      </div>
    </div>
    )