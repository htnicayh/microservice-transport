import { Controller, Get, Inject, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  // private readonly logger = new Logger(AppController.name)

  constructor(
    @Inject('CLIENT_SERVICE') private clientKafka: ClientKafka
  ) {}

  public async onModuleInit() {
    ['kafka'].forEach(key => {
      this.clientKafka.subscribeToResponseOf(`${key}`)
    })
    await this.clientKafka.connect()
  }

  public onModuleDestroy() {
    return this.clientKafka.close()
  }

  @Get('kafka')
  public kafka() {
    return this.clientKafka.emit('kafka', {
      kafka: 'nestjs',
      now: Date.now().toString()
    })
  }

  @Get('kafka-response')
  public kafkaRs() {
    return this.clientKafka.send('kafka', {
      kafka: 'nestjs',
      now: Date.now().toString()
    })
  }
}
