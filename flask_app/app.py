from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from PIL import Image
import base64
#import cv2
from sklearn.cluster import KMeans
from collections import Counter
from matplotlib import colors
from rembg import remove  # Ensure 'rembg' is installed
import os
import io


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your pre-trained joblib model
model = joblib.load('classificationModel.joblib')
print("Model loaded successfully.")  # Debug 

# Directory to save processed images and background-removed images
processed_images_folder = 'processed_images'
output_folder = 'output_images'

os.makedirs(processed_images_folder, exist_ok=True)  # Create the processed images directory if it does not exist
os.makedirs(output_folder, exist_ok=True)  # Create the output images directory if it does not exist

def get_dominant_colors(image, k=5, background_color=(255, 255, 255), threshold=30):
    # Remove all pixels that are fully transparent (alpha = 0)
    if image.shape[2] == 4:  # Check if image has alpha channel
        mask = image[:, :, 3] > 0  # Create a mask for non-transparent pixels
        image = image[mask]  # Filter out the transparent pixels
        image = image[:, :3]  # Drop the alpha channel

    # Filter out background color pixels
    mask = np.all(np.abs(image - background_color) > threshold, axis=1)
    filtered_pixels = image[mask]

    if len(filtered_pixels) == 0:
        return ['#FFFFFF']  # Default to white if no colors are found

    kmeans = KMeans(n_clusters=k)
    kmeans.fit(filtered_pixels)

    colors_rgb = kmeans.cluster_centers_.astype(int)
    counts = Counter(kmeans.labels_)

    # Sort clusters by frequency (most common color first)
    most_common = counts.most_common()

    # Remove the largest cluster assuming it's the background
    most_common.pop(0)

    # Extract remaining colors
    ordered_colors = [colors_rgb[i] for i, _ in most_common]

    # Convert RGB to Hex for better visualization
    hex_colors = [colors.to_hex(color / 255.0) for color in ordered_colors]

    return hex_colors

@app.route('/upload', methods=['POST'])
def predict():
    if 'file' not in request.files:
        print("No file part in the request.")  # Debug 
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        print("No file selected by the user.")  # Debug 
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Open the image file
        image = Image.open(file)
        print(f"Original image format: {image.format}, size: {image.size}, mode: {image.mode}")  # Debug 
        
        # Convert image to RGBA format (if not already in that mode)
        image_rgb = image.convert('RGBA')  # Convert to RGBA to preserve transparency

        # Remove background
        image_no_bg = remove(image_rgb)
        print(f"Background removed successfully.")  # Debug 

        # Replace transparent pixels with black
        image_no_bg = image_no_bg.convert('RGBA')  # Ensure the image is in RGBA mode
        data = np.array(image_no_bg)  # Convert to numpy array for pixel manipulation
        print(f"Image converted to numpy array for processing.")  # Debug

        # Set the background to black where alpha channel is zero
        black_background = (data[:, :, 3] == 0)  # Find where alpha is 0
        data[black_background] = [0, 0, 0, 255]  # Set to black with full opacity
        image_black_bg = Image.fromarray(data)  # Convert back to PIL Image
        print(f"Transparent pixels replaced with black background.")  # Debug

        # Resize to 28x28 and convert to grayscale
        image_resized = image_black_bg.resize((28, 28)).convert('L')
        print(f"Processed image size: {image_resized.size}, mode: {image_resized.mode}")  # Debug 

        # Save the processed image
        processed_image_path = os.path.join(processed_images_folder, 'processed_image.png')
        image_resized.save(processed_image_path)
        print(f"Processed image saved as {processed_image_path}.")  # Debug 

        # Convert to numpy array and normalize
        image_array = np.array(image_resized) / 255.0
        print(f"Image array shape: {image_array.shape}, min: {image_array.min()}, max: {image_array.max()}")  # Debug 

        # Reshape to the expected input shape for the model
        image_array = image_array.reshape(1, 28, 28, 1)  # Reshape to (1, 28, 28, 1) if the model expects this shape
        print(f"Reshaped image array shape: {image_array.shape}")  # Debug 

        # Predict clothing type
        logits = model.predict(image_array)
        print(f"Model prediction logits: {logits}")  # Debug 

        # Convert logits to probabilities and get class index
        class_index = int(np.argmax(logits))
        print(f"Predicted class index: {class_index}")  # Debug 

        # Class names for each index
        class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat', 'Shoe', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']
        clothing_name = class_names[class_index]

        # Convert background-removed image to OpenCV format
        image_no_bg_cv = np.array(image_no_bg)
        print(f"Image with removed background converted to OpenCV format.")  # Debug 

        # Extract dominant colors
        hex_colors = get_dominant_colors(image_no_bg_cv)

        # Save the background-removed image
        output_filename = os.path.join(output_folder, 'output_image.png')
        image_no_bg.save(output_filename)
        print(f"Background-removed image saved as {output_filename}.")  # Debug 

        return jsonify({
            'class': class_index,
            'clothing_name': clothing_name,
            'colors': hex_colors,
            'background_removed_image': output_filename
        })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")  # Debug 
        return jsonify({'error': str(e)}), 500

@app.route('/process-image', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    
    # Read the image file
    img = Image.open(file)
    img = img.convert("RGBA")

    print(f"Image format: {img.format}, size: {img.size}, mode: {img.mode}")  # Debug

    # Remove background using rembg
    output = remove(img)
    
    # Check output image format and mode
    print(f"Output image size: {output.size}, mode: {output.mode}")  # Debug

    # Convert image to bytes
    buffered = io.BytesIO()
    output.save(buffered, format="PNG")
    processed_image = base64.b64encode(buffered.getvalue()).decode()

    return jsonify({'processedImage': processed_image})

if __name__ == '__main__':
    app.run(debug=True)

    