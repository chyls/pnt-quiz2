import { loginPost, LoginRequestDTO, LoginResponse } from "@/service/client/Auth/login.post";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useLogin(){
    return useMutation<LoginResponse, AxiosError<any>, LoginRequestDTO>({
        mutationFn: loginPost
    })
}