import React, 
        {
            useState,
            useEffect,
            createContext,
            useContext,
        }  from 'react'
import axiosInstance from "../../axios";

const UserContext = createContext()

function UserProvider({children}){
    const [userState, setUserState] = useState({
        isLoggedIn: false,
        isLoggingIn: true,
        isSigningUp: false,
        username: '',
        user: {},
        userId: '',
    })
    var userLog = userState.isLoggedIn===true
    useEffect(() =>{
        const username = localStorage.getItem("current_user")
        if(username!==null){ // userState.isLoggedIn && 
            axiosInstance.get('user/user/'+ username +'/')
				.then((res) => {
					setUserState({ 
						isLoggedIn: true,
						user: res.data,
						username: res.data.user_name,
                        userId: res.data.id,
					});
				})
        }
    }, [userLog])
    const value = {userState, setUserState}
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUserContext(){
    const context = useContext(UserContext)
    if(context === undefined){
        throw new Error('useUserContext must be used within an UserProvider')
    }
    return context
}

export {UserProvider, useUserContext}