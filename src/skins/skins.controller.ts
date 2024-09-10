import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SkinsService } from './skins.service';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';
import { FindManySkinsDto } from './dto/find-many-skins.dto';

@Controller('skins')
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}

  @Post()
  create(@Body() createSkinDto: CreateSkinDto) {
    return this.skinsService.create(createSkinDto);
  }

  @Get()
  findAll(@Query() findManySkinsDto: FindManySkinsDto) {
    return this.skinsService.findAll(findManySkinsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skinsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkinDto: UpdateSkinDto) {
    return this.skinsService.update(id, updateSkinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skinsService.remove(id);
  }
}
