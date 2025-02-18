import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContect = createContext();

const AppContextProvider = (props) =>{

    const currencySymbol = '₹'

    const value = {
        doctors,currencySymbol
    }

    return(
        <AppContect.Provider value={value}>
            {props.children}
        </AppContect.Provider>
    )
}
export default AppContextProvider