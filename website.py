from flask import Blueprint, render_template, jsonify
import json

# register api
website = Blueprint("website", __name__)

@website.route("/", methods=['GET'])
def hello():
    return render_template('index.html')