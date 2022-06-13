import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)
  
  constructor(
    private readonly appService: AppService
  ) {}

  @MessagePattern({ cmd: 'sum' })
  async accumulate(values: number[]): Promise<number> {
    this.logger.log('Receive message from publisher')

    return (values || []).reduce((acc, curr) => Number(acc) + Number(curr))
  }
}
