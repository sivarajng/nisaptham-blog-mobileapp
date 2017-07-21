import Type from './actionTypes'

export const Get = () => {
    return (dispatch) => {
        dispatch({
            type: Type.GET,
            payload: "SIVARAJNG@GMAIL.COM"
        })
    }
}