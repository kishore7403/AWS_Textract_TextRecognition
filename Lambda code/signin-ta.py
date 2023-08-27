import boto3
import json
import hashlib

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    
    table_secret_name = 'dynamoDB_tableName-ta'
    region_name = "us-east-1"
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )
    
    try:
        get_table_name_response = client.get_secret_value(
            SecretId=table_secret_name
        )
    except ClientError as e:
        print(e)
    
    table_name_response = json.loads(get_table_name_response['SecretString'])
    table_name = table_name_response['dynamoDB_tableName-ta']
    print(table_name)
    
    table = dynamodb.Table(table_name)
    
    try:
        username = event['username']
        password = event['password']
        hashed_password = hashlib.md5(password.encode()).hexdigest()
        
        item = {
            'username': username,
            'password': hashed_password
        }
        
        response = table.put_item(Item=item)
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Access-Control-Max-Age': '3600',
            },
            'body': json.dumps({'message': 'Data inserted successfully'}),
        }
    except Exception as e:
        print('Error inserting data:', e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Access-Control-Max-Age': '3600',
            },
            'body': json.dumps({'message': 'Error inserting data into DynamoDB'}),
        }
