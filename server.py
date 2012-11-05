from flask import Flask, Response, request, render_template, url_for, redirect
import pymongo

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

if __name__ == "__main__":
    app.run()