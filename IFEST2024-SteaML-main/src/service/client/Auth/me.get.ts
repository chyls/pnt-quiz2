import {z} from "zod"
import axiosInstance from "../axios"

const meResponseValidation = z.object({
    success: z.boolean(),
    code : z.number(),
    data: z.object({
        id: z.number(),
        role: z.string(),
        username: z.string(),
        flag: z.string()
    })
})

export type MeResponse = z.infer<typeof meResponseValidation>

export const meGet = async()=>{
    const res = await axiosInstance.get("/api/me")
    return meResponseValidation.parse(res.data)
}