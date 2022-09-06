import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AnimalQueryParamsDto } from '../dtos/add-user-role.dto';

@Injectable()
export class PetfinderService {
  private API_KEY: string;
  private API_SECRET: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.API_KEY = this.configService.get('API_KEY');
    this.API_SECRET = this.configService.get('API_SECRET');
  }

  async getAnimals(reqParams: AnimalQueryParamsDto) {
    const { access_token } = await this.requestPetfinderAccessToken();
    const url = '/animals';
    const response = await this.request({ url, method: 'get',params:reqParams }, access_token);
    return response;
  }

  async getAnimal(id: string) {
    const { access_token } = await this.requestPetfinderAccessToken();
    const url = `/animals/${id}`;
    const response = await this.request({ url, method: 'get' }, access_token);
    return response;
  }

  async getAnimalsTypes() {
    const { access_token } = await this.requestPetfinderAccessToken();
    const url = `/types`;
    const response = await this.request({ url, method: 'get' }, access_token);
    return response;
  }

  async getAnimalType(animalType: string) {
    const { access_token } = await this.requestPetfinderAccessToken();
    const url = `/types/${animalType}`;
    const response = await this.request({ url, method: 'get' }, access_token);
    return response;
  }

  async getAnimalBreedOfGivenType(animalType: string) {
    const { access_token } = await this.requestPetfinderAccessToken();
    const url = `/types/${animalType}`;
    const response = await this.request({ url, method: 'get' }, access_token);
    return response;
  }

  async getOrganizations() {
    const { access_token } = await this.requestPetfinderAccessToken();
    const url = `/organizations`;
    const response = await this.request({ url, method: 'get' }, access_token);
    return response;
  }

  async getOrganization(id: string) {
    const { access_token } = await this.requestPetfinderAccessToken();
    const url = `/organizations/${id}`;
    const response = await this.request({ url, method: 'get' }, access_token);
    return response;
  }

  private requestPetfinderAccessToken(): any {
    const url = `/oauth2/token`;
    const data = {
      client_id: this.API_KEY,
      client_secret: this.API_SECRET,
      grant_type: 'client_credentials',
    };
    return new Promise((resovle, reject) => {
      firstValueFrom(this.httpService.request({ url, data, method: 'post' }))
        .then((res) => resovle(res.data))
        .catch((ex) => reject(ex.response?.data));
    });
  }

  private request(options: any, access_token: string): any {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return new Promise((resovle, reject) => {
      firstValueFrom(this.httpService.request({ ...options, headers }))
        .then((res) => resovle(res.data))
        .catch((ex) => reject(ex.response?.data));
    });
  }
}
