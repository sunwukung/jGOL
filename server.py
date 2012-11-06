from flask import Flask, Response, request, render_template, url_for, redirect, jsonify
import pymongo
import controllers

app = Flask(__name__)
app.debug=True



@app.route("/")
def home():
    return render_template('index.html')


@app.route("/pattern/<family>/<genus>")
def pattern(family, genus):
	#try:
	p = controllers.patterns()
	json = p.get(family, genus)
	app.logger.info(json)

	res = Response(
		response=json,
		status=200,
		mimetype="application/json")
	return res
	#except:
	#	return 'could not locate the pattern'

if __name__ == "__main__":
    app.run()