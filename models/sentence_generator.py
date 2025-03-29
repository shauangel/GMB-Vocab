"""
Tool: OpenAI API

Responsibility:
* prompting for sentence generation
* openAI credential
"""
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-4o",
    input="generate a sentence with the word 'fish'"
)

print(response.output_text)