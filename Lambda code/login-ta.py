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
        print(username, password)
        
        hashed_password = hashlib.md5(password.encode()).hexdigest()
        
        # Perform the GetItem operation to check if the user exists in DynamoDB
        response = table.get_item(Key={'username': username, 'password': hashed_password})
        print(response)
        print(type(response))
        
        if 'Item' in response:
            print("True")
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                    'Access-Control-Max-Age': '3600',
                },
                'body': json.dumps({'message': 'User credentials are valid'}),
            }
        else:
            print("False")
            return {
                'statusCode': 401,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                    'Access-Control-Max-Age': '3600',
                },
                'body': json.dumps({'message': 'Invalid username or password'}),
            }
    except Exception as e:
        print('Error checking user:', e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Access-Control-Max-Age': '3600',
            },
            'body': json.dumps({'message': 'Error checking user in DynamoDB'}),
        }
