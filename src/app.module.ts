import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PetfinderModule } from 'src/petfinder/petfinder.module';

@Module({
  imports: [PetfinderModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
