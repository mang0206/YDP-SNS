from flask import Flask, jsonify
from . import app

@app.route('/')
def index():
    return josnify({'':'hello'})