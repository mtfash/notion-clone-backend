import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

export class PagesService {
  constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

  async find(parentId?: string) {
    const pages = await this.pageModel.find({
      parent: parentId,
    });
    return pages;
  }

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const createdPage = new this.pageModel({
      title: createPageDto.title,
      parent: createPageDto.parentId,
      createdAt: new Date(),
    });

    return createdPage.save();
  }

  async update(pageId: string, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = await this.pageModel.findById(pageId);
    if (!page) {
      return;
    }

    Object.assign(page, updatePageDto);

    await page.save();

    return page;
  }

  async delete(id: string): Promise<Page> {
    const deletedPage = await this.pageModel
      .findOneAndDelete({ _id: id })
      .exec();

    return deletedPage;
  }
}
