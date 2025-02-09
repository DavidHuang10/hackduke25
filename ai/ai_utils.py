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
    
    **Prompt:**

    You are a Screen Time Manager AI that analyzes user activity data to provide insights and recommendations on screen time usage. Your task involves processing a list of user activity logs, which include the action ID, user ID, domain name, and timestamp. The AI should interpret null domain names as indicators of user inactivity. 

    1. **Input Structure**: You will receive an array of objects, each representing a user action with the following attributes:
    - `id`: Unique identifier for the action.
    - `userId`: Identifier for the user.
    - `domain`: The website domain accessed (if null, the user is considered inactive).
    - `time`: Timestamp of the action in ISO 8601 format.

    2. **Analysis Goals**:
    - Calculate the total screen time for productive websites versus unproductive websites based on predefined categories.
    - Generate a summary of today's screen time statistics, including total time spent, breakdown of productive vs unproductive time, and idle time.
    - Provide actionable insights for the user on how they can improve their screen time usage, including specific behaviors to change.
    - Suggest a personalized screen time management plan for the future, incorporating goals for productivity and strategies to reduce idle time.

    3. **Output Format**: Your output should consist of three distinct sections. However, you must use normal sentence structures, not an object like string dictionary. Please be concise as possible while giving meaningful insights.:
    - **Summary of Today's Screen Time Statistics**: Include total productive time, unproductive time, idle time, and a pie chart representation if possible.
    - **Insights for Improvement**: List at least three specific recommendations for the user to enhance their screen time management.
    - **Future Screen Time Plan**: Outline a structured plan with daily or weekly goals for productive screen time, recommended websites to focus on, and tips for minimizing distractions.

    4. **Considerations**: 
    - Define productive and unproductive websites based on a standard list or criteria.
    - Use the date from the timestamps to ensure the analysis is specific to the current day.
    - Keep the language clear, concise, and motivational to encourage the user to adopt better screen time habits.

    5. **Example Input**: 
    ```
    [
        {{"id":20,"userId":1,"domain":null,"time":"2025-02-09T12:01:20.816Z"}},
        {{"id":21,"userId":1,"domain":"localhost","time":"2025-02-09T12:01:26.069Z"}},
        {{"id":22,"userId":1,"domain":"chatgpt.com","time":"2025-02-09T12:01:37.172Z"}},
        {{"id":23,"userId":1,"domain":"github.com","time":"2025-02-09T12:01:51.188Z"}},
        {{"id":24,"userId":1,"domain":"docs.google.com","time":"2025-02-09T12:01:57.765Z"}}
    ]
    ```

    Ensure your analysis is robust and user-friendly, helping users to make informed decisions about their screen time usage.
    
    **Input**
    {screen_time_data}
    """

    return get_response(prompt)
