import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("ERROR: GEMINI_API_KEY is missing! Add it to your .env file.")

# Configure Gemini AI
genai.configure(api_key=GEMINI_API_KEY)

def get_response(prompt):
    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        return response.text.strip() if response.text else "No response from AI."
    except Exception as e:
        return f"Error: {str(e)}"

def classify_website(name, verbose=False):
    prompt = f"""
    **Prompt:**
    You are tasked with classifying websites based on their potential to distract users while they are in focus mode. Given the domain name of a website, classify it into one of the following categories:

    - **Disturbing (-1)**: The website is likely to lead to significant distractions and should be controlled.
    - **Depends on the context (0)**: The website may or may not be distracting based on specific user context or content, use this option sparingly.
    - **Not Disturbing (1)**: The website is unlikely to cause distractions and can be allowed.

    For each domain name provided, give a clear classification based on the above criteria while minimizing the use of option (0). On the next line, provide a brief justification for your classification if necessary. Ensure your decisions are concise and focused on the impact of the website on user concentration. 

    **Input Format:** 
    - Domain Name: [Enter domain here] 
    - Justification Option: [True or False]

    **Output Format:** 
    [Choose -1, 0, or 1]
    [Optional brief explanation] 

    **Example Input 1:** 
    - Domain Name: exampleone.com
    - Justification Option: True
    
    **Example Output 1:**
    1
    This website provides educational content that supports focus.
    
    **Example 2:** 
    - Domain Name: exampletwo.com
    - Justification Option: False
    
    **Example Output 1:**
    -1
    
    **Input:**
    - Domain Name: {name}
    - Justinfication Option: {verbose}
    """
    
    return get_response(prompt)
    

def generate_advice(screen_time_data):
    prompt = f"""
    Analyze this user's screen time behavior and provide insights:
    Total time: {screen_time_data.get('total_time')}
    Top domains: {', '.join(screen_time_data.get('top_domains', []))}
    Categories:
      - Social Media: {screen_time_data.get('categories', {}).get('social_media', 'N/A')}
      - Entertainment: {screen_time_data.get('categories', {}).get('entertainment', 'N/A')}
      - Productivity: {screen_time_data.get('categories', {}).get('productivity', 'N/A')}
    
    Suggest ways to improve productivity and reduce distractions.
    """

    return get_response(prompt)
