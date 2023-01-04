import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

@Injectable()
export class GeneratorService {
  public uuid(): string {
    return uuid();
  }

  public fileName(ext: string, prefix?: string): string {
    return prefix
      ? prefix + '_' + this.uuid() + '.' + ext
      : this.uuid() + '.' + ext;
  }
}
