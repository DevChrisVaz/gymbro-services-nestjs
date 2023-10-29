export class Serializer {
  constructor(partial: Partial<Serializer>) {
    Object.assign(this, partial);
  }
}
