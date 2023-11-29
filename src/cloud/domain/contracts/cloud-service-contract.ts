import { FileStorageService } from './file-storage-service';

export abstract class CloudServicesContract {
  abstract fileStorage: FileStorageService;
}
