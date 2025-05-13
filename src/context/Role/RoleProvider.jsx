import { useRole } from "../../hooks/useRole";
import { RoleContext } from "./RoleContext";

export const RoleProvider = ({ children }) => {
  const {
    roles,
    roleSelected,
    initialRoleForm,
    visibleForm,
    handlerOpenForm,
    handlerCloseForm,
    handlerAddRole,
    handlerRemoveRole,
    handlerSelectRoleForm,
  } = useRole();

  return (
    <RoleContext.Provider
      value={{
        roles,
        roleSelected,
        initialRoleForm,
        visibleForm,
        handlerOpenForm,
        handlerCloseForm,
        handlerAddRole,
        handlerRemoveRole,
        handlerSelectRoleForm,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};