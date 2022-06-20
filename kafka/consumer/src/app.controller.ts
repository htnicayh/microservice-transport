import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(private readonly appService: AppService) {}

  @MessagePattern('kafka')
  public receiveMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const origin = context.getMessage()
    const response = `
      Receiving a new message from topic: kafka - 
    ` + JSON.stringify(origin.value)

    this.logger.log({ response, message })
    
    return response
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
