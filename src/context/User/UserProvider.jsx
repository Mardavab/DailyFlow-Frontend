import { useUser } from "../../hooks/useUser"
import { UserContext } from "../User/UserContext"

export const UserProvider = ({children}) =>{

    const {
        users,
        userSelected,
        initialUserForm,
        visibleform,
        handlerOpenForm,
        handlerCloseForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerSelecterUserForm,
      } = useUser();
      
    return(
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleform,
                handlerOpenForm,
                handlerCloseForm,
                handlerAddUser,
                handlerRemoveUser,
                handlerSelecterUserForm,
            }
        }>
            {children}
        </UserContext.Provider>
    )
}