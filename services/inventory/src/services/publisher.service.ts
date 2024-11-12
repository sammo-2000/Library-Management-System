import Publisher from '../models/Publisher';

//Business Logic Layer

export class PublisherService {
  public async getPublishers() {
    return await Publisher.findAll();
  }}