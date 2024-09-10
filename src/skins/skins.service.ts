import { Injectable } from '@nestjs/common';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';
import { PrismaService } from 'src/database/prisma.service';
import { FindManySkinsDto } from './dto/find-many-skins.dto';

@Injectable()
export class SkinsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSkinDto: CreateSkinDto) {
    return this.prisma.skin.create({ data: createSkinDto });
  }

  findAll(findManySkinsDto: FindManySkinsDto) {
    return this.prisma.skin.findMany({
      where: {
        name: findManySkinsDto?.name && findManySkinsDto?.name,
        price: {
          gte: findManySkinsDto?.startPrice || -Infinity,
          lte: findManySkinsDto?.endPrice || Infinity,
        },
        float: findManySkinsDto?.float && findManySkinsDto?.float,
        category: findManySkinsDto?.category && findManySkinsDto?.category,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.skin.findFirst({ where: { id } });
  }

  update(id: string, updateSkinDto: UpdateSkinDto) {
    return this.prisma.skin.update({
      where: { id },
      data: updateSkinDto,
    });
  }

  remove(id: string) {
    return this.prisma.skin.delete({ where: { id } });
  }
}
