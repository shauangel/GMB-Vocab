from flask import Blueprint, render_template, jsonify
import json

# register api
gmb_webpage = Blueprint("gmb_webpage", __name__)

@gmb_webpage.route("/", methods=['GET'])
def hello():
    return render_template('index.html')