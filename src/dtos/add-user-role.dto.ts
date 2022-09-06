import { ApiProperty } from '@nestjs/swagger';
import {IsOptional } from 'class-validator';

export class AnimalQueryParamsDto {

  @ApiProperty({ required:false})
  type: string;

  @ApiProperty({ required:false})
  breed:string

  @ApiProperty({ required:false})
  size:string
}
