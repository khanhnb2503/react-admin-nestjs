export class BaseEntity {
  id: string;

  createdAt?: number = Date.now();

  updatedAt?: number = Date.now();
}
