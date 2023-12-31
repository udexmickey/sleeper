import { AbstractDocument } from '@app/common/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  @Prop({ select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
