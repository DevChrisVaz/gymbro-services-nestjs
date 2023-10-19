export abstract class DataHashingContract {
  abstract hash(data: string): Promise<string>;
  abstract compare(comparison: string, hashedData: string): Promise<boolean>;
}
