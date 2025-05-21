import { useContext } from "react";
import { UserContext } from "../../context/User/UserContext";

export const UserRow = ({ user }) => {
  const { handlerSelecterUserForm, handlerRemoveUser } =
    useContext(UserContext);
  return (
    <>
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.date}</td>
        <td>
          <div style={{ display: "inline-block" }}>
            <button
              type="button"
              className="btn btn-info btn-circle"
              onClick={() => handlerSelecterUserForm(user)}
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>
          <div style={{ display: "inline-block", marginLeft: "5px" }}>
            <button
              type="button"
              className="btn btn-danger btn-circle"
              data-toggle="modal"
              data-target="#DeleteModalUser"
              onClick={() => handlerRemoveUser(user.id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
