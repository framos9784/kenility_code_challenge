import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  address: string;

  @Prop()
  profile_picture: string;

  @Prop({ type: Date })
  _created_at: Date;

  @Prop({ type: Date })
  _updated_at: Date;

  @Prop({ type: Date })
  _removed_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
