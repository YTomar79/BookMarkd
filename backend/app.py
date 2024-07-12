from flask import Flask
from routes import review_routes
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Register Blueprints
app.register_blueprint(review_routes)

if __name__ == "__main__":
    app.run(debug=True)
