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
        model = genai.GenerativeModel("gemini-2.0-flash-thinking-exp-01-21")
        response = model.generate_content(prompt)
        return response.text.strip() if response.text else "No response from AI."
    except Exception as e:
        return f"Error: {str(e)}"

def classify_website(name, verbose=False):
    prompt = f"""
    You are an AI assistant designed to help users maintain focus by classifying websites based on their potential for distraction. Your task is to analyze a given domain name and categorize it according to its likelihood of disrupting a user's concentration during focused work sessions.

    Here is the domain name you need to classify:
    {name}

    And here is whether justification is required (true/false):
    {verbose}

    Please follow these steps to classify the website:

    1. Analyze the domain name and consider the typical content and purpose of the website.

    2. Classify the website into one of the following categories:
    - Distracting (-1): Websites likely to cause significant distractions (e.g., social media, video streaming, gaming)
    - Depends on the context (0): Websites that may or may not be distracting based on specific use cases
    - Productive (1): Websites unlikely to cause distractions (e.g., productivity tools, reference sites, professional resources)

    3. Provide your classification as a single digit: -1, 0, or 1.

    4. If justification is required (justification required is true), provide a brief explanation for your classification on a new line. If justification is not required, do not provide any additional information.

    Pay special attention to avoid misclassifying common productivity tools or search engines as distracting.

    Examples of common website classifications (do not use these in your response, they are for guidance only):
    - messenger.com: 0 (Depends on the context) - It's a messaging tool and productivity depends on the context
    - facebook.com: -1 (Distracting) - Social media platform likely to cause distractions
    - wikipedia.org: 1 (Productive) - Informational website, unlikely to cause significant distractions
    
    Output Format:
    [classification as a single digit]
    [justification]

    Remember:
    - Provide justification ONLY if the justification_required variable is set to true.
    - Focus on the website's potential impact on user concentration, not its content quality or usefulness outside of focus sessions.

    Please proceed with your analysis and classification.
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
