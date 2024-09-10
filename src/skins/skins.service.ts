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
    let orderObj = {};
    orderObj[findManySkinsDto.orderBy] = findManySkinsDto.order || 'asc';

    return this.prisma.skin.findMany({
      where: {
        ...(findManySkinsDto?.name && { name: findManySkinsDto?.name }),
        price: {
          ...(findManySkinsDto.startPrice && {
            gte: +findManySkinsDto?.startPrice,
          }),
          ...(findManySkinsDto.endPrice && {
            lte: +findManySkinsDto?.endPrice,
          }),
        },
        ...(findManySkinsDto?.float && { float: +findManySkinsDto?.float }),
        ...(findManySkinsDto.category && {
          category: findManySkinsDto?.category,
        }),
      },
      orderBy: orderObj,
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
