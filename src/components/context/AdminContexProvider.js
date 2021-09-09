import * as React from 'react'

// check what is exacted used to import correctly
const AdminContext = React.createContext()

function AdminProvider({children}){
    const [adminState, setAdminState] = React.useState({
        isLoggedIn: false,
        isLoggingIn: false,
        isSigningUp: false,
        username: '',
        user: {},
    })

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