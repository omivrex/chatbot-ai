# AI Chatbot API

This API allows users to interact with an AI chatbot. It accepts user messages, generates responses, and suggests follow-up questions based on the conversation context. The API is built using Node.js, TypeScript, and Express, and leverages OpenAI's GPT-3.5-turbo model.

## Setup Instructions

### Prerequisites

-   Node.js (v18 or higher)
-   npm (v10 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/omivrex/chatbot-ai.git
    cd ai-chatbot-api
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your OpenAI API key:

    ```env
    OPENAI_API_KEY=your_openai_api_key
    ```

4. Build the project:

    ```bash
    npm run build
    ```

5. Start the server:

    ```bash
    npm start
    ```

6. For development mode with auto-restart on file changes:

    ```bash
    npm run dev
    ```

## Usage

### Endpoint

`POST /api/chat`

### Request

#### Headers

-   `Content-Type: application/json`

#### Body

The body should be a JSON object containing a `message` field:

```json
{
    "message": "Your message here"
}
```

#### Response

The response will also be a JSON object containing a `response` field, and a `followUpQuestions` field:

```json
{
    "response": "As of 2021, the United States has the highest number of billionaires in the world. The U.S. is home to a significant number of billionaires across various industries such as technology, finance, and retail.",
    "followUpQuestions": [
        {
            "question": "What are some of the other countries that have a high number of billionaires?"
        },
        {
            "question": "How does the number of billionaires in the United States compare to other countries?"
        },
        {
            "question": "Which industries in the U.S. have the highest concentration of billionaires?"
        },
        {
            "question": "Are there any specific individuals in the U.S. who are particularly well-known for their billionaire status?"
        }
    ]
}
```

### Thanks!
