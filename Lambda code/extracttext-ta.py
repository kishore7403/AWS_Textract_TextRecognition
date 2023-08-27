import boto3
import json
from botocore.exceptions import ClientError

def lambda_handler(event, context):
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

    key = event['filename']
    s3_client = boto3.client('s3')
    textract_client = boto3.client('textract')

    response = s3_client.get_object(Bucket=bucket_name, Key=key)
    content = response['Body'].read()

    textract_response = textract_client.detect_document_text(Document={'Bytes': content})

    extracted_text = ""
    extracted_text_list = []

    for item in textract_response['Blocks']:
        if item['BlockType'] == 'LINE':
            extracted_text += item['Text'] + "\n"
            extracted_text_list.append(item["Text"])

    return {
        'statusCode': 200,
        'extracted_text': extracted_text,
        'extracted_text_list': extracted_text_list,
        'body': 'Text extraction successful!'
    }
