import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
  accumulate(params: number[]) {
    return (params || []).reduce((arr, curr) => +arr + +curr, 0)
  }
}
