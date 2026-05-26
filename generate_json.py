import os
import json

# Configuration
folder_name = 'pgraphs'
output_file = 'photos.json'
allowed_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}

photo_data = []

try:
    # Scan the directory
    for filename in os.listdir(folder_name):
        name, ext = os.path.splitext(filename)
        
        # Check if the file is an image
        if ext.lower() in allowed_extensions:
            # Clean up title: replace underscores/dashes with spaces and capitalize
            title = name.replace('_', ' ').replace('-', ' ').title()
            
            photo_data.append({
                "title": title,
                "src": f"{folder_name}/{filename}"
            })
    
    # Write the JSON file
    with open(output_file, 'w') as f:
        json.dump(photo_data, f, indent=4)
        
    print(f"✅ Successfully generated {output_file} with {len(photo_data)} images!")

except FileNotFoundError:
    print(f"❌ Error: The folder '{folder_name}' was not found. Please make sure it exists.")