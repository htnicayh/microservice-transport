import { Observable } from "rxjs"

interface INumberArray {
    params: number[]
}

export interface IGrpcService {
    accumulate(numberArray: INumberArray): Observable<any>
}