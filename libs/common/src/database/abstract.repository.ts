import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createDocument.save()).toJSON() as unknown as TDocument;
  }

  async findAll(filterQuery?: FilterQuery<TDocument>): Promise<TDocument[]> {
    const allDocuments = await this.model
      .find(filterQuery)
      .lean<TDocument[]>(true);

    return allDocuments;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    unSelect?: string,
  ): Promise<TDocument> {
    const findDocument = await this.model
      .findOne(filterQuery, unSelect)
      .lean<TDocument>(true);

    if (!findDocument) {
      this.logger.warn('Document not found with filter query', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return findDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document not found with filter query', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const documents = await this.model
      .findByIdAndDelete(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document not found with filter query', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return documents;
  }
}
