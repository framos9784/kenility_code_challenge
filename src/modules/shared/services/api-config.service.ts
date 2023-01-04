import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get appPortConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  get mongooseConfig(): MongooseModuleOptions {
    return {
      uri: this.isDevelopment
        ? `mongodb://${this.getString('MONGO_USERNAME')}:${this.getString(
            'MONGO_PASSWORD',
          )}@${this.getString('MONGO_HOSTNAME')}:${this.getNumber(
            'MONGO_PORT',
          )}/${this.getString('MONGO_DATABASE')}`
        : `mongodb+srv://${this.getString('MONGO_USERNAME')}:${this.getString(
            'MONGO_PASSWORD',
          )}@${this.getString('MONGO_HOSTNAME')}/${this.getString(
            'MONGO_DATABASE',
          )}?retryWrites=true&w=majority`,
      autoIndex: true
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
