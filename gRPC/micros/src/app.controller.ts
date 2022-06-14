import { Controller, Get, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MathService } from './math.service';

interface INumberArray {
  params: number[]
}

interface ISumOfNumber {
  total: number
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(
    private readonly mathService: MathService
  ) {}

  @GrpcMethod('AppController', 'Accumulate')
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumber {
    this.logger.log('Receive gRPC from microservices')

    return {
      total: this.mathService.accumulate(numberArray.params)
    }
  }
}
