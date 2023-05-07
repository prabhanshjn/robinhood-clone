const initialState = {
    currentSymbol: "",
    symbolData: null
}


const stockReducer = (state = initialState, action) => {

    switch(action.type){
        case "SET_CURRENT_STOCK":
            return{
                ...initialState,
                currentSymbol: action.data
            }
        case "SET_CURRENT_DATA":
            console.log(action.data)
            return{
            ...initialState,
            symbolData: action.data,
            currentSymbol: action.data.name,
            }
        default:
            return state
    }
}

export default stockReducer