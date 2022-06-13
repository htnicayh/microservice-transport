import { Body, Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(
    @Inject('MATH_SERVICE')
    private readonly client: ClientProxy
  ) {}

  @Get()
  accumulate(@Body() params: number[]): Observable<number> {
    this.logger.log(params)
    return this.client.send<number>({ cmd: 'sum' }, params)
  }

}
