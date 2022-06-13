import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { MathService } from './math.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379'
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [MathService],
})
export class AppModule {}
