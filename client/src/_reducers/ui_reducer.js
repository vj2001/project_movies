const initialState={
    dark:false
}

export default function(state=initialState,action){
    if(action.type==="dark")
    {
        return {...state, dark: action.value}
    }
    
    return state
}