from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Set OpenAI API key securely from .env file
openai_api_key = os.getenv('OPENAI_API_KEY')

# Check if the API key is loaded correctly
if openai_api_key:
    print(f"OpenAI API Key exists and begins {openai_api_key[:8]}")
else:
    print("OpenAI API Key not set")

# Assuming OpenAI is used as an interface here
openai.api_key = openai_api_key

MODEL = 'gpt-3.5-turbo'  # Ensure to use a valid OpenAI model like gpt-3.5-turbo or gpt-4

system_message = "You are a helpful assistant of this website called Science Socity of Oluvil the Url is http://localhost:3000 . you are also a part of website ."

app = Flask(__name__)

# Enable CORS for all routes (modify to allow specific origins if needed)
CORS(app, resources={r"/process-prompt": {"origins": "http://localhost:8080"}})

@app.route('/process-prompt', methods=['POST'])
def process_prompt():
    try:
        # Get the JSON data from the incoming request
        data = request.get_json()
        prompt = data.get('query')
        history = data.get('history', [])

        # Ensure the 'query' field is present
        if not prompt:
            return jsonify({"error": "'query' field is required"}), 400

        # Start streaming the response
        return Response(chat(prompt, history), content_type='text/plain;charset=utf-8')
    except Exception as e:
        # Log error to Flask's console
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def chat(message, history):
    # Prepare messages by including system message and history
    messages = [{"role": "system", "content": system_message}] + history + [{"role": "user", "content": message}]
    
    print("History is:", history)
    print("Messages are:", messages)

    
        # Create a chat completion stream
    stream = openai.chat.completions.create(model=MODEL, messages=messages, stream=True)
        
    response = ""
    for chunk in stream:
        response = chunk.choices[0].delta.content or ''
        yield response

    
        
if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5001)