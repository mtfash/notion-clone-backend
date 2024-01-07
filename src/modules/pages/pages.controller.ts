import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { ApiQuery } from '@nestjs/swagger';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller({
  path: 'pages',
  version: '1',
})
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @ApiQuery({ required: false, name: 'parentId' })
  async find(@Query('parentId') parentId?: string) {
    return await this.pagesService.find(parentId);
  }

  @Get('/recent')
  async findRecentlyCreated() {
    return await this.pagesService.findRecentlyCreated();
  }

  @Post()
  async createPage(@Body() createPageDto: CreatePageDto) {
    return await this.pagesService.create(createPageDto);
  }

  @Put(':pageId')
  async updatePage(
    @Param('pageId') pageId: string,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    return await this.pagesService.update(pageId, updatePageDto);
  }

  @Delete(':pageId')
  async deletePage(@Param('pageId') pageId: string) {
    const deletedPage = await this.pagesService.delete(pageId);
    if (!deletedPage) {
      throw new NotFoundException(`Page was not found`);
    }
    return deletedPage;
  }
}
