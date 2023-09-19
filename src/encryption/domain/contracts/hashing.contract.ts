export abstract class DataHashingContract {
    abstract hash(data: string): Promise<string>;
    abstract compare(hashedData: string, comparison: string): Promise<boolean>;
}