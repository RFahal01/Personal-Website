import pandas as pd

# Load the CSV file
file_path = r'C:\Users\rfahal\OneDrive - University of Iowa\Desktop\automate repetitive entries IT Closet Update Project - Copy.csv'
data = pd.read_csv(file_path)

# Generate JavaScript data
js_data = []

for index, row in data.iterrows():
    js_data.append({
        "Building Number": f"{row['Building Number']}-{row['Building Abbreviation']}",
        "Location": row['Building'],
        "Room Number": row['Room Number'],
        "Directions": "INSERT DIRECTIONS",
        "Abbreviation": row['Building Abbreviation'],
        "Image": "path/to/image.jpg"  # Update this path to your images
    })

# Generate JavaScript code
js_code = "const roomsData = " + str(js_data).replace("'", '"') + ";"

# Save the JavaScript code to a file
with open('script.js', 'w') as file:
    file.write(js_code)

print("JavaScript code has been generated and saved to script.js")
