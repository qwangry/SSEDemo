import api from "./api";

export const userApi = {
    getUser:(id:number)=>api.get(`/api/user/${id}`),
    createUser:(data:Record<string,any>)=>api.post(`/api/user`,data),
    getUserByUid:(uid:string)=>Promise.resolve(uid),
}