import { createContext,useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) =>{
    const [name,setName] = useState("raju")
    const [add,setAdd] = useState({
        name:"",
        location:"",
        price:""
    })
    return(
        <AppContext.Provider value ={{name,setName,add,setAdd}}>
        {children}
        </AppContext.Provider>
    )
}