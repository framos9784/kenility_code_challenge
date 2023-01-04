export class PutBucketObjectDto
{
    Bucket: string;
    Body: Buffer;
    ACL?: string;
    ContentType: string;
    Key: string;
}