import { Injectable } from '@nestjs/common';
import { DataDao } from './data.dao';
import { Data } from './data.db';

@Injectable()
export class AppService {

  constructor(
    private readonly dataDao: DataDao
  ){}

  async getAll() {
    return await this.dataDao.getAll()
  }

  async getById(id: string) {
    return await this.dataDao.get(id)
  }

  async create(data: Data) {
    return await this.dataDao.create(data)
  }

  async delete(id: string) {
    return await this.dataDao.delete(id)
  }

  async update(id: string, data: Data) {
    return await this.dataDao.update(id, data)
  }
}
