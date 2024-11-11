export class InMemoryDB<T> {
  private db: { [id: string]: T };

  constructor() {
    this.db = {};
  }

  list(): T[] {
    return Object.values<T>(this.db);
  }

  get(id: string): T | undefined {
    const result: T = this.db[id];
    return result ? { ...result } : undefined;
  }

  add(id: string, dto: T): T | undefined {
    const result = this.get(id);
    if (!result) {
      this.db[id] = { ...dto };
    }
    return result ? undefined : { ...dto };
  }

  delete(id: string): T | undefined {
    const result = this.get(id);
    if (result) {
      delete this.db[id];
    }
    return result;
  }

  update(id: string, dto: T): T | undefined {
    const result = this.get(id);
    if (result) {
      this.db[id] = { ...dto };
    }
    return result ? { ...dto } : undefined;
  }
}
