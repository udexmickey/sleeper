import { AbstractRepository } from '@app/common/database';
import { Injectable, Logger } from '@nestjs/common';
import { User } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(User.name);
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
}
