export const setToken = token =>{
    window.localStorage.setItem('jwt',token)
}
export const getToken = () =>{
    window.localStorage.getItem('jwt')
}
export const clearToken = () =>{
    window.localStorage.clear('jwt')
}