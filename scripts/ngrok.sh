#!/bin/bash

# Ngrok integration script for development
# Usage: ./scripts/ngrok.sh

echo "Starting ngrok tunnel for port 8080..."

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "Error: ngrok is not installed"
    echo "Please install ngrok from https://ngrok.com/download"
    exit 1
fi

# Set authtoken
export NGROK_AUTHTOKEN="3DIkJqYBvDxv8bnQaWFy4q5xyoQ_3iKgXbAFWvTvxnEiSZMA3"

# Start ngrok (dynamic domain for now)
echo "Starting ngrok tunnel..."
echo "Your portfolio will be available at the URL shown below"
echo ""
echo "Press Ctrl+C to stop ngrok"
echo ""

ngrok http 8080
