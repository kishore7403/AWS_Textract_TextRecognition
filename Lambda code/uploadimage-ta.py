import json
import base64
import boto3
from datetime import datetime
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    s3 = boto3.client("s3")
    
    print(event)
    get_file_content = event["content"]
    username = event["username"]
    key = event['filename']
    
    decode_content = base64.b64decode(get_file_content)
    
    bucket_secret_name = "imageToText_bucketName-ta"
    region_name = "us-east-1"
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )
    
    try:
        get_bucket_name_response = client.get_secret_value(
            SecretId=bucket_secret_name
        )
    except ClientError as e:
        print(e)
    
    bucket_name_response = json.loads(get_bucket_name_response['SecretString'])
    bucket_name = bucket_name_response['imageToText_bucketName-ta']
    print(bucket_name)
    
    s3_upload = s3.put_object(Bucket=bucket_name, Key=key, Body=decode_content)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Access-Control-Max-Age': '3600',
        },
        'body': json.dumps('File stored in S3.')
    }
