import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Data } from './data.db';

@Controller("data")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Get(":id")
  getById(@Param('id') id: string) {
    return this.appService.getById(id);
  }

  @Post()
  create(@Body() data: Data) {
    // TODO: Add schema validation (other methods here would benefit from this as well)
    return this.appService.create(data);
  }

  @Patch(":id")
  update(@Param('id') id: string, @Body() data: Data) {
    return this.appService.update(id, data);
  }

  @Delete(":id")
  delete(@Param('id') id: string) {
    return this.appService.delete(id);
  }
}
