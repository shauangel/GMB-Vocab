#!/usr/bin/env python
import os
import logging
import sys
from flask import Flask, jsonify, request

# CORS validation
from flask_cors import CORS

# blueprint register
from gmb_api import gmb_api
from gmb_webpage import gmb_webpage

logging.basicConfig(stream=sys.stdout)
app = Flask(__name__)
blueprint_prefix = [
    (gmb_api, "/api"),
    (gmb_webpage, "/")
]


def register_blueprint(app):
    for blueprint, prefix in blueprint_prefix:
        app.register_blueprint(blueprint, url_prefix=prefix)
    return app


# set Flask application
app = Flask(__name__)
CORS(app)
register_blueprint(app)


if __name__ == "__main__":
    print("Welcome to GMB Vocab~~")
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 8080), debug=True)
