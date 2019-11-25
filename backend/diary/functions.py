import os
from azure.cognitiveservices.language.textanalytics import TextAnalyticsClient
from msrest.authentication import CognitiveServicesCredentials

def get_env():
    key_var_name = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY'
    if not key_var_name in os.environ:
        raise Exception('Please set/export the environment variable: {}'.format(key_var_name))
    subscription_key = os.environ[key_var_name]

    endpoint_var_name = 'TEXT_ANALYTICS_ENDPOINT'
    if not endpoint_var_name in os.environ:
        raise Exception('Please set/export the environment variable: {}'.format(endpoint_var_name))
    endpoint = os.environ[endpoint_var_name]
    return subscription_key, endpoint


def authenticateClient():
    subscription_key, endpoint = get_env()
    credentials = CognitiveServicesCredentials(subscription_key)
    text_analytics_client = TextAnalyticsClient(
        endpoint=endpoint, credentials=credentials)
    return text_analytics_client

def sentiment(text):
    client = authenticateClient()
    try:
        documents = [
            {"id": "1", "language": "en", "text": text},
        ]
        response = client.sentiment(documents=documents)
        if len(response.documents) > 0:
            return int(response.documents[0].score * 100)
        raise Exception("API SHOULD RETURN SCORE")
    except Exception as err:
        print("Encountered exception. {}".format(err))
        return 50

def key_phrase(text):
    client = authenticateClient()
    try:
        documents = [
            {"id": "1", "language": "en", "text": text},
        ]
        response = client.key_phrases(documents=documents)
        if len(response.documents) > 0:
            return response.documents[0].key_phrases
        raise Exception("API SHOULD RETURN KEY PHRASE")
    except Exception as err:
        print("Encountered exception. {}".format(err))
        return ""