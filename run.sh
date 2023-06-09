#!/bin/bash
DEFAULT_NUMIDS=10
DEFAULT_URL="https://example.com/"
DEFAULT_WILL_GENERATE_IMAGES='n'

read -p "Enter the number of IDs to generate (default: $DEFAULT_NUMIDS): " numIds
read -p "Please enter a URL prefix (default: $DEFAULT_URL): " url
read -p "Generate QR images for testing purposes Y/n (default: $DEFAULT_WILL_GENERATE_IMAGES): " willGenerateImages

# If no numIds entered, use default numIds
if [[ -z "$numIds" ]]; then
  numIds="$DEFAULT_NUMIDS"
fi

# If no URL entered, use default URL
if [[ -z "$url" ]]; then
  url="$DEFAULT_URL"
fi

# If no willGenerateImages entered, use default willGenerateImages
if [[ -z "$willGenerateImages" ]]; then
  willGenerateImages="$DEFAULT_WILL_GENERATE_IMAGES"
fi

# Check if numIds is a valid number
if ! [[ "$numIds" =~ ^[0-9]+$ ]]; then
  echo "Error: Invalid number of IDs"
  exit 1
fi

# Check if numIds is greater than 0
if [ "$numIds" -lt 1 ]; then
  echo "Error: Number of IDs must be greater than 0"
  exit 1
fi

# Check if URL starts with https
if [[ "$url" != https* ]]; then
  echo "Error: URL must start with https"
  exit 1
fi

# Check if URL ends with a backslash
if [[ "${url: -1}" != "/" ]]; then
  echo "Error: URL must end with a backslash"
  exit 1
fi

# Run the Node.js script
yarn ts-node src/index.ts $numIds $url $willGenerateImages
