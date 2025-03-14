import os
import cv2
import cvzone
from flask import Flask, Response
from cvzone.PoseModule import PoseDetector
import numpy as np

app = Flask(__name__)

# Initialize video capture (using a webcam)
cap = cv2.VideoCapture(0)  # Change to your webcam ID if necessary
detector = PoseDetector()

# Path to the shirts folder
shirtFolderPath = "Resources/Shirts"
listShirts = os.listdir(shirtFolderPath)

# Ratios for resizing the shirt image
fixedRatio = 262 / 190  # widthOfShirt/widthOfPoint11to12
shirtRatioHeightWidth = 581 / 440

# Buttons for UI
imgButtonRight = cv2.imread("Resources/button.png", cv2.IMREAD_UNCHANGED)
imgButtonLeft = cv2.flip(imgButtonRight, 1)

# Variables to control shirt selection
counterRight = 0
counterLeft = 0
selectionSpeed = 10
imageNumber = 0

def add_alpha_channel(img):
    """ Convert a 3-channel image (BGR) to a 4-channel image (BGRA) """
    b, g, r = cv2.split(img)
    alpha = np.ones(b.shape, dtype=b.dtype) * 255  # Create a fully opaque alpha channel
    img_with_alpha = cv2.merge([b, g, r, alpha])
    return img_with_alpha

def generate_frames():
    global counterRight, counterLeft, imageNumber

    while True:
        success, img = cap.read()  # Read the video frame
        img = detector.findPose(img, draw=False)  # Detect the pose without drawing the skeleton
        lmList, bboxInfo = detector.findPosition(img, bboxWithHands=False, draw=False)  # Get pose landmarks without drawing

        if lmList:  # Proceed if landmarks are detected
            # Extract coordinates of shoulders (landmark 11 and 12)
            lm11 = lmList[11][0:2]  # Right shoulder
            lm12 = lmList[12][0:2]  # Left shoulder

            # Calculate shirt width based on shoulder distance and stretch it by 20%
            widthOfShirt = int((lm11[0] - lm12[0]) * fixedRatio * 1.1)  # Increase width by 20%

            # Ensure that the calculated width is valid
            if widthOfShirt > 0:
                # Load and resize the shirt image
                imgShirt = cv2.imread(os.path.join(shirtFolderPath, listShirts[imageNumber]), cv2.IMREAD_UNCHANGED)

                # Check if the image has 4 channels (RGBA), and if not, add an alpha channel
                if imgShirt.shape[2] == 3:  # If the image has only 3 channels (RGB)
                    imgShirt = add_alpha_channel(imgShirt)  # Add an alpha channel to make it 4-channel (RGBA)

                imgShirt = cv2.resize(imgShirt, (widthOfShirt, int(widthOfShirt * shirtRatioHeightWidth)))

                # Adjust the shirt's position based on the user's body scale
                currentScale = (lm11[0] - lm12[0]) / 190
                offset = int(44 * currentScale), int(20 * currentScale)  # Decrease vertical offset for higher position

                try:
                    # Overlay the shirt onto the frame at the calculated position
                    img = cvzone.overlayPNG(img, imgShirt, (lm12[0] - offset[0] - 2, lm12[1] - offset[1] - 25))  # Move left by 30 pixels
                except Exception as e:
                    print(f"Error overlaying shirt: {e}")

            # Overlay the right and left navigation buttons
            img = cvzone.overlayPNG(img, imgButtonRight, (1074, 293))
            img = cvzone.overlayPNG(img, imgButtonLeft, (72, 293))

            # Check for user hand positions to change shirts
            right_hand_y = lmList[16][1]
            left_hand_y = lmList[15][1]

            # Button area for right and left buttons (adjust these values based on your UI)
            right_button_area = (139, 360)
            left_button_area = (1138, 360)

            # Check if the right hand is over the right button
            if right_hand_y < right_button_area[1] + 33 and right_hand_y > right_button_area[1] - 33:
                counterRight += 1
                cv2.ellipse(img, (right_button_area[0], right_button_area[1]), (66, 66), 0, 0, counterRight * selectionSpeed, (0, 255, 0), 20)
                if counterRight * selectionSpeed > 360:
                    counterRight = 0
                    if imageNumber < len(listShirts) - 1:
                        imageNumber += 1

            # Check if the left hand is over the left button
            elif left_hand_y < left_button_area[1] + 33 and left_hand_y > left_button_area[1] - 33:
                counterLeft += 1
                cv2.ellipse(img, (left_button_area[0], left_button_area[1]), (66, 66), 0, 0, counterLeft * selectionSpeed, (0, 255, 0), 20)
                if counterLeft * selectionSpeed > 360:
                    counterLeft = 0
                    if imageNumber > 0:
                        imageNumber -= 1
            else:
                # Reset the counters when hands are not in a selection position
                counterRight = 0
                counterLeft = 0

        # Encode the image to JPEG format
        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5999, debug=True)
