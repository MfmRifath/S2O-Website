from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import os
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import requests
import json
from typing import List
from openai import OpenAI
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


# Load environment variables
load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')

# Ensure API key is valid
if api_key and api_key.startswith('sk-proj-') and len(api_key) > 10:
    print("API key looks good so far")
else:
    print("There might be a problem with your API key. Please visit the troubleshooting notebook!")

# Initialize OpenAI
MODEL = 'gpt-4o-mini'
openai = OpenAI()
app = Flask(__name__)

# Enable CORS for all routes (modify to allow specific origins if needed)
CORS(app, resources={r"/process-prompt": {"origins": "http://localhost:8080"}})

# Define a system prompt for analyzing links


class Website:
    """
    A utility class to represent a Website that we have scraped using Selenium.
    """
    def __init__(self, url):
        self.url = url
        self.driver = self.setup_driver()
        self.driver.get(url)

        # Wait for the body of the page to load completely
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

        # Wait for the navbar to be visible (if dynamically loaded)
        navbar_locator = (By.CSS_SELECTOR, "nav")  # Adjust to the correct selector for your navbar
        WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(navbar_locator))

        # If the navbar is hidden behind a hamburger menu, click it to reveal the links
        try:
            hamburger_button = self.driver.find_element(By.CSS_SELECTOR, ".hamburger-menu-button")  # Adjust as needed
            hamburger_button.click()
            WebDriverWait(self.driver, 5).until(EC.visibility_of_element_located(navbar_locator))
        except Exception as e:
            print("Hamburger menu button not found or already visible")

        # Let the page load and scrape content
        self.soup = BeautifulSoup(self.driver.page_source, 'html.parser')
        self.title = self.soup.title.string if self.soup.title else "No title found"
        self.text = self.get_page_text()
        self.links = self.get_links()

    def setup_driver(self):
        # Setup Chrome options
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")

        # Use the Service class to specify the path to ChromeDriver
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        return driver

    def get_page_text(self):
        # Extract text from the page
        if self.soup.body:
            for irrelevant in self.soup.body(["script", "style", "img", "input"]):
                irrelevant.decompose()
            return self.soup.body.get_text(separator="\n", strip=True)
        return ""

    def get_links(self):
        # Find all the links
        links = [link.get('href') for link in self.soup.find_all('a')]
        return [link for link in links if link]

    def get_contents(self):
        return f"Webpage Title:\n{self.title}\nWebpage Contents:\n{self.text}\n\n"

    def close_driver(self):
        self.driver.quit()



def get_all_details(url):
    result = "Landing page:\n"
    website = Website(url)
    result += website.get_contents()

    links = Website(url).links
    print("Found links:", links)  # Log links found

    if "links" in links:
        for link in links["links"]:
            result += f"\n\n{link['type']}\n"
            result += Website(link["url"]).get_contents()
    
    # Close the driver after scraping
    website.close_driver()
    return result

# System prompt for OpenAI
system_prompt = """
You are an assistant of a website which Url is given.
Give the responsive answer to their chat. 
Answer the question based on the Socity’s details. If the question is not relevant, respond with 'Not relevant.' Otherwise, assist the user as requested.
Use only the key details from the pages, and do not include unnecessary links or irrelevant content.
"""

def get_user_prompt(socity_name, url, question):
    user_prompt = f"You are looking at a Society called: {socity_name}\n"
    user_prompt += f"Here are the contents of its landing page and other relevant pages; use this information to give the answer to the question if they ask, otherwise assist them.\n"
    user_prompt += f"Their chat is: {question}\n"
    user_prompt += get_all_details(url)
    user_prompt = user_prompt[:20_000]  # Truncate if more than 20,000 characters
    return user_prompt

def create_Answer(socity_name, url, question):
    response = openai.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": get_user_prompt(socity_name, url, question)}
        ],
    )

    try:
        result = response.choices[0].message.content
        return result
    except Exception as e:
        print(f"Error creating answer: {e}")
        return "Error processing your request."

def chat(message, history):
    try:
        # Fetch the responses from both pages (home and academy)
        response1 = create_Answer("S2O", "http://localhost:3000", message)
        response2 = create_Answer("S2O", "http://localhost:3000/s2oAcademy", message)
        response3 = create_Answer("S2O", "http://localhost:3000/eventCalender", message)
        response4 = create_Answer("S2O", "http://localhost:3000/article", message)

        # If any response has an error or is empty, we handle it gracefully
        if not response1 or "Error" in response1:
            response1 = "No relevant information found on the homepage."
        if not response2 or "Error" in response2:
            response2 = "No relevant information found on the S2O Academy page."
        if not response3 or "Error" in response3:
            response3 = "No relevant information found on the S2O Event page."
        if not response4 or "Error" in response4:
            response4 = "No relevant information found on the S2O Aricle page."

        # Combine both responses into a single prompt for OpenAI
        combined_prompt = f"""
        You have been given two responses from different pages of the S2O website:

        Response from S2O Homepage:
        {response1}

        Response from S2O Academy Page:
        {response2}
        
        Response from S2O Event Page:
        {response3}
        
        Response from S2O Article Page:
        {response4}

        Your task is to combine the information from both responses into a single cohesive answer. 
        Please remove any redundancies (e.g., repeated greetings) and provide a unified, clear, and concise response based on the content of both responses. 
        Do not include any irrelevant or repetitive information.
        """

        # Send the combined prompt to OpenAI to process
        openai_response = openai.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are a helpful assistant who merges responses into one cohesive and clear message."},
                {"role": "user", "content": combined_prompt},
            ]
        )

        # Get the response from OpenAI
        result = openai_response.choices[0].message.content.strip()

        # Return the combined response
        yield result

    except Exception as e:
        print(f"Error in chat function: {e}")
        yield "Error processing your request."

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

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5001)