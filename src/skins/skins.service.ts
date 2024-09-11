import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findAll(findManySkinsDto: FindManySkinsDto) {
    const count = await this.prisma.skin.count();
    const pages = Math.ceil(count / Number(findManySkinsDto.take));

    const skip = findManySkinsDto.page * Number(findManySkinsDto.take);

    let orderObj = {};
    if (findManySkinsDto.orderBy) {
      orderObj[findManySkinsDto.orderBy] = findManySkinsDto?.order || 'asc';
    }

    const skins = await this.prisma.skin.findMany({
      skip: skip,
      take: Number(findManySkinsDto.take),
      where: {
        ...(findManySkinsDto?.name && {
          name: {
            contains: findManySkinsDto.name,
            mode: 'insensitive',
          },
        }),
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
      orderBy: {
        name: 'asc',
      },
      ...(Object.entries(orderObj).length && { orderBy: orderObj }),
    });

    return {
      skins,
      pages,
    };
  }

  async findOne(id: string) {
    const exists = await this.prisma.skin.findUnique({ where: { id } });

    if (!exists) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.skin.findUnique({ where: { id } });
  }

  async update(id: string, updateSkinDto: UpdateSkinDto) {
    const exists = await this.prisma.skin.findUnique({ where: { id } });

    if (!exists) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.skin.update({
      where: { id },
      data: updateSkinDto,
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.skin.findUnique({ where: { id } });

    if (!exists) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.skin.delete({ where: { id } });
  }
}
