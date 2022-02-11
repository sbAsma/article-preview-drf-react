import * as React from 'react'
import {useEffect} from 'react'
import axiosInstance from "../../axios";
// check what is exacted used to import correctly
const AdminContext = React.createContext()

function AdminProvider({children}){
    const [adminState, setAdminState] = React.useState({
        isLoggedIn: false,
        isLoggingIn: false,
        isSigningUp: false,
        username: '',
        user: {},
        userId: '',
    })
    var userLog = adminState.isLoggedIn===true
    useEffect(() =>{
        const username = localStorage.getItem("current_user")
        if(username!==null){ // adminState.isLoggedIn && 
            axiosInstance.get('user/user/'+ username +'/')
				.then((res) => {
					setAdminState({ 
						isLoggedIn: true,
						user: res.data,
						username: res.data.user_name,
                        userId: res.data.id,
					});
				})
        }
    }, [userLog])
    const value = {adminState, setAdminState}
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

function useAdminContext(){
    const context = React.useContext(AdminContext)
    if(context === undefined){
        throw new Error('useAdminContext must be used within an AdminProvider')
    }
    return context
}

export {AdminProvider, useAdminContext}