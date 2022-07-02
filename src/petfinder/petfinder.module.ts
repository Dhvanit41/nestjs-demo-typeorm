import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PetfinderController } from './petfinder.controller';
import { PetfinderService } from './petfinder.service';

@Module({
  imports: [
    HttpModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
        baseURL: `${configService.get('PETFINDER_URL')}/v2`,
      }),
    }),
  ],
  controllers: [PetfinderController],
  providers: [PetfinderService],
  exports: [PetfinderService],
})
export class PetfinderModule {}
