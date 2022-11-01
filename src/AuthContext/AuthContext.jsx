import React from 'react'

export const AuthContext= React.createContext()
let authvalue=localStorage.getItem("isAuth")
const AuthContextProvider=({children})=> {
    const [isAuth, setIsAuth]=React.useState(authvalue || false);

    const handleSignin= async ({userName, password}) =>{
        console.log(userName,password)
        if(userName==="foo" && password === "bar"){
            await setIsAuth(true);
            await localStorage.setItem("isAuth",true)
    }
}
const handleLogout=async()=>{
    await setIsAuth(false);
    await localStorage.removeItem("isAuth")
}
const value={isAuth,handleSignin,handleLogout}
        return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
