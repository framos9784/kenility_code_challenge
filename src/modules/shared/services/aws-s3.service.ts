import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { GeneratorService } from './generator.services';
import { IFile } from '../../../interfaces/IFile';
import { PromiseResult } from 'aws-sdk/lib/request';
import { PutBucketObjectDto } from './put-bucket-object.dto';

@Injectable()
export class AwsS3Service {
  private readonly s3: AWS.S3;

  constructor(
    private configService: ApiConfigService,
    private generatorService: GeneratorService,
    ) {
    const awsConfig = configService.awsS3Config;

    const options: AWS.S3.Types.ClientConfiguration = {
      apiVersion: awsConfig.apiVersion,
      region: awsConfig.bucketRegion,
    };

    if (awsConfig.accessKeyId && awsConfig.secretAccessKey) {
      options.credentials = awsConfig;
    }

    this.s3 = new AWS.S3(options);
  }


  async uploadImageToNewsBucket(file: IFile, customFileName?: string): Promise<string> {
    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );  

    const key = `${customFileName ? customFileName : fileName}`;

    const putBucketObjectDto: PutBucketObjectDto = {
      Bucket : this.configService.awsS3Config.bucketNameProfilePictureImages,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      Key: key,
    }

    await this.uploadFile(putBucketObjectDto);

    return `https://${this.configService.awsS3Config.bucketNameProfilePictureImages}.s3.${this.configService.awsS3Config.bucketRegion}.amazonaws.com/${key}`;
  }

  async uploadFile(putBucketObjectDto: PutBucketObjectDto): Promise<void> {
    await this.s3
      .putObject(putBucketObjectDto)
      .promise();
  }

  download(
    fileKey: string,
    bucket: string,
  ): Promise<PromiseResult<AWS.S3.GetObjectOutput, AWS.AWSError>> {
    return this.s3
      .getObject({
        Bucket: bucket,
        Key: fileKey,
      })
      .promise();
  }
}
