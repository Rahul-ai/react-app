const initialState = {}

export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "login": return {
            ...state,
            ...action.data
        }
        default: return state
    }
}