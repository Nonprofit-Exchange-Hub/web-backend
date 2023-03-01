import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { DeleteResult, Repository } from 'typeorm';

import { Asset } from './entities/asset.entity';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { GetAssetsDto } from './dto/get-asset.dto';
import { User } from '../acccount-manager/entities/user.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Like } from 'typeorm';

@Injectable()
export class AssetsService {
  constructor(@InjectRepository(Asset) private assetsRepository: Repository<Asset>) {}

  async create(createAssetDto: CreateAssetDto, poster: User): Promise<Asset> {
    return this.assetsRepository.save({ ...createAssetDto, poster });
  }

  async findOne(id: number): Promise<Asset> {
    return this.assetsRepository.findOneBy({ id });
  }

  async getAssets(getAssetsDto: GetAssetsDto): Promise<Asset[]> {
    const { limit, offset, title, ...rest } = getAssetsDto;
    const whereParams = title ? { title: Like(`%${title}%`), ...rest } : { ...rest };

    return (
      this.assetsRepository.find({
        where: whereParams,
        order: {
          datePosted: 'DESC',
        },
        skip: offset,
        take: limit,
      }) || []
    );
  }

  async update(id: number, updateAssetDto: UpdateAssetDto, poster: User): Promise<Asset> {
    await this.assetsRepository.update(id, { ...updateAssetDto, poster });
    return this.assetsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.assetsRepository.delete(id);
  }
}
