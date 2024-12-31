from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import openai
import os
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

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

system_prompt = """
You are an assistant tasked with analyzing the content of the Science Society of Oluvil (S2O) website. 
Your role is to respond only to questions related to the S2O website, providing concise answers based on the relevant information. 
Ignore navigation-related text or any unrelated content.

- Respond in markdown format.
- If the content is unclear or you're unsure, reply with "I don't know."
- If the user does not ask a question, encourage them to ask about the S2O website.
- Only answer questions related to the S2O website.
"""
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
    # A class to represent a Webpage

# A class to represent a Webpage
# If you're not familiar with Classes, check out the "Intermediate Python" notebook

import requests
from bs4 import BeautifulSoup

class Website:
    def __init__(self, url):
        """
        Create this Website object from the given URL using Selenium and BeautifulSoup
        """
        self.url = url
        try:
            # Setup Chrome WebDriver (Make sure ChromeDriver is installed and in your PATH)
            options = webdriver.ChromeOptions()
            options.add_argument("--headless")  # Run in headless mode (without opening a browser window)
            self.driver = webdriver.Chrome(options=options)

            # Open the URL in the browser
            self.driver.get(url)
            
            # Wait for the JavaScript to load the content
            time.sleep(3)  # Adjust this time if needed depending on the website

            # Get the page source after JavaScript execution
            page_source = self.driver.page_source

            # Use BeautifulSoup to parse the page
            soup = BeautifulSoup(page_source, 'html.parser')
            
            # Get the title of the website
            self.title = soup.title.string if soup.title else "No title found"
            
            # Remove irrelevant tags like <script>, <style>, <img>, and <input>
            for irrelevant in soup.body.find_all(["script", "style", "img", "input"]):
                irrelevant.decompose()

            # Get the text content of the page, separated by newlines, and strip extra whitespace
            self.text = soup.body.get_text(separator="\n", strip=True)

        except Exception as e:
            print(f"Error fetching the URL: {e}")
            self.title = "Error: Unable to fetch title"
            self.text = "Error: Unable to extract text"

        finally:
            # Close the browser after the extraction
            self.driver.quit()

# Create a Website object for the URL
website = Website("http://localhost:3000")

# Print the title and text content of the website
print("Title:", website.title)
print("Text:", website.text)

def user_prompt_for(website, userPrompt):
    user_prompt = f"I am Lokking for the the website {website.title}"
    user_prompt += "\nThe contents of this website is as follows; \
please provide a answer for my questions of this website in markdown. \
If it includes news or announcements, then summarize these too.\n\n" 
    user_prompt+= f"The question is {userPrompt}\n\n"
    user_prompt += website.text
    return user_prompt

def messages_for(website, userPrompt):
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt_for(website, userPrompt)}
    ]
def chat(message, history):
    # Prepare messages by including system message and history
    website = Website("http://localhost:3000")
    messages = messages_for(website, message)
    
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