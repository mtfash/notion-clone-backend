import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema()
export class Page {
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Page' })
  parent?: Page;

  @Prop()
  createdAt: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
