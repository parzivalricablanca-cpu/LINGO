# Lingo (Python / Flask version)

Same project, now with a Python backend — matches your professor's recommendation.

**Team:** Jerome Gabriel Ricablanca, Martin Regalado, Lenard Remus Yu

## Project structure
```
lingo-flask/
├── app.py                 # Flask app + /translate route
├── requirements.txt
├── templates/
│   └── index.html         # page template (Jinja)
└── static/
    ├── css/style.css
    └── js/script.js       # calls /translate via fetch
```

## Open in Visual Studio Code
1. Install [VS Code](https://code.visualstudio.com/) if you don't have it.
2. Install the **Python** extension (Microsoft) from the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Unzip/copy this `lingo-flask` folder somewhere on your machine.
4. In VS Code: **File → Open Folder…** and select `lingo-flask`.
5. Open a terminal inside VS Code: **Terminal → New Terminal**.

## Run it
In the VS Code terminal:
```bash
python3 -m venv venv
source venv/bin/activate        # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Then open **http://127.0.0.1:5000** in your browser. VS Code will also show a clickable link in the terminal output.

The "Translate" button on the page sends a request to the `/translate` route in `app.py`, which currently returns mock results. Swap the logic inside `translate_text()`, `translate_audio()`, and `translate_image()` for real model calls (e.g. the Gemini API, or your speech/gesture recognition pipeline) when that part of the project is ready.

## Putting it on GitHub
```bash
git init
git add .
git commit -m "Lingo Flask app"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
