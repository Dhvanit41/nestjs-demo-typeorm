import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PetfinderService } from './petfinder.service';
import { AnimalQueryParamsDto } from 'src/dtos';

@Controller('petfinder')
@ApiTags('Petfinder')

export class PetfinderController {
  constructor(private petfinderService: PetfinderService) {}
  @Get('/animals')
  async getAnimals(@Query()reqParams:AnimalQueryParamsDto) {
    return await this.petfinderService.getAnimals(reqParams);
  }

  @Get('/animals/:id')
  async getAnimal(@Param('id') id: string) {
    return await this.petfinderService.getAnimal(id);
  }

  @Get('/types')
  async getAnimalTypes() {
    return await this.petfinderService.getAnimalsTypes();
  }

  @Get('/types/:type')
  async getSingleAnimalTypes(@Param('type') animalType: string) {
    return await this.petfinderService.getAnimalType(animalType);
  }

  @Get('/types/:type/breeds')
  async getAnimalBreedOfGivenType(@Param('type') animalType: string) {
    return await this.petfinderService.getAnimalBreedOfGivenType(animalType);
  }

  @Get('/organizations')
  async getOrganizations() {
    return await this.petfinderService.getOrganizations();
  }

  @Get('/organization/:id')
  async getOrganization(@Param('id') id: string) {
    return await this.petfinderService.getOrganization(id);
  }
}
