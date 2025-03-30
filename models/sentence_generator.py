"""
Tool: OpenAI API

Responsibility:
* prompting for sentence generation
* openAI credential (after deployment)
"""
from openai import OpenAI
import re
import json


class SentenceGenerator:
    def __init__(self):
        self.client = OpenAI()

    def get_single(self, word, k):
        """

        :param word: target vocabulary
        :param k: number of sentences to generate
        :return: k sentences
        """
        prompt = (f"generate {k} sentence with the word '{word}'\n"
                  f"Return only a Python-style list of strings. No explanations, no introductions.")
        response = self.client.responses.create(
            model="gpt-4o",
            input=prompt
        )
        match = re.search(r'```python\s*(.*?)\s*```', response.output_text, re.DOTALL)
        if match:
            json_str = match.group(1)

            try:
                data = json.loads(json_str)
            except json.JSONDecodeError as e:
                print("Failed to parse JSON:", e)
        return data

    def get_multiple(self, word_list, k):
        prompt = (f"generate {k} sentence for each words: {word_list}"
                  f"Response only in a json format. No explanations, no introductions.")
        response = self.client.responses.create(
            model="gpt-4o",
            input=prompt
        )
        match = re.search(r'```json\s*(.*?)\s*```', response.output_text, re.DOTALL)
        print(response)
        if match:
            json_str = match.group(1)

            try:
                data = json.loads(json_str)
            except json.JSONDecodeError as e:
                print("Failed to parse JSON:", e)
        return data


if __name__ == "__main__":
    sg = SentenceGenerator()
    s = sg.get_single('fish', 3)
    print(s)
    # s = sg.get_multiple(['fish', 'dog', 'cat'], 3)
    # print(s)