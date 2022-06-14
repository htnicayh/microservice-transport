import { Body, Controller, Get, Logger, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { IGrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';

@Controller()
export class AppController implements OnModuleInit {
  private readonly logger = new Logger(AppController.name)

  @Client(microserviceOptions)
  private client: ClientGrpc

  private grpcService: IGrpcService

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController')
  }

  @Post('add')
  async accumulate(@Body() params: number[]): Promise<any> {
    this.logger.log('Adding + ' + params.toString())

    return this.grpcService.accumulate({ params: params })
  }
}
