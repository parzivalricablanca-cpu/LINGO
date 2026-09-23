"""
Lingo — Flask web app
Serves the project site and a /translate endpoint the front-end demo calls.

Run locally:
    pip install -r requirements.txt
    python app.py
Then open http://127.0.0.1:5000 in your browser.
"""

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Mock "known phrase" translations, just so the demo has something to show
# for the sample input. Replace translate_text() below with a real model
# call (e.g. Gemini) when you're ready to make this live.
MOCK_TRANSLATIONS = {
    "你好，很高兴认识你": "Hello, it's nice to meet you.",
}


def translate_text(text: str) -> str:
    """Stand-in for the real translation model.

    Swap this out for an actual call to your AI backend
    (e.g. Gemini API, a speech-to-text + translation pipeline, etc).
    """
    return MOCK_TRANSLATIONS.get(text.strip(), "Hello, nice to meet you.")


def translate_audio() -> str:
    """Stand-in for audio input handling."""
    return 'Transcript: "Good morning, where is the station?"'


def translate_image() -> str:
    """Stand-in for image/gesture input handling."""
    return 'Recognized gesture: "Thank you."'


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json(force=True)
    input_type = data.get("type", "text")

    if input_type == "text":
        result = translate_text(data.get("text", ""))
    elif input_type == "audio":
        result = translate_audio()
    elif input_type == "image":
        result = translate_image()
    else:
        return jsonify({"error": "Unknown input type"}), 400

    return jsonify({"result": result})


if __name__ == "__main__":
    app.run(debug=True)
