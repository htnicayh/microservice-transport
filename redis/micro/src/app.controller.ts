import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MathService } from './math.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(
    private readonly mathService: MathService
  ) {}

  @MessagePattern('notifications')
  async accumulate(params: number[]): Promise<number> {
    this.logger.log('Receive message from publisher')

    return (params || []).reduce((acc, curr) => Number(acc) + Number(curr))
  }
}
