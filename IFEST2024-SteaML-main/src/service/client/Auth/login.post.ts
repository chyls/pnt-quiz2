import {z} from "zod"
import axiosInstance from "../axios"

export interface LoginRequestDTO{
    username : string,
    password: string
}

const loginResponseValidation = z.object({
    success: z.boolean(),
    code : z.number(),
    data: z.object({
        accessToken: z.string()
    })
})

export type LoginResponse = z.infer<typeof loginResponseValidation>

export const loginPost = async(payload: LoginRequestDTO)=>{
    const res = await axiosInstance.post("/api/login", payload)
    return loginResponseValidation.parse(res.data)
}