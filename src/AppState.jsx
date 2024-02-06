import { useReducer, createContext, useState } from "react";

export const AppContext = createContext()

export const StateProvider = ({ children }) => {

const set = (state , action ) => {
    let newState = {...state}
    newState[action.prop]=action.value
    return(
        newState
    )
}

const reducer = (state,action) => {
switch (action.type) {
    case 'set':
        return(
            set(state,action)
        )
        break;

    default:
        break;
}
}

const [AppState , dispatch] = useReducer(reducer , {
    logedIn:false,
    userName:'',
    groupName:'',
    role:'',
    profilePic:'',
    visitor:false
})

    return (
        <AppContext.Provider value={{ AppState: AppState, dispatch: dispatch}}>
            {children}
        </AppContext.Provider>
    )


}