# Use an official Maven image with Java 8
FROM maven:3.6.3-jdk-8

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Run the Maven build with detailed error logs
RUN mvn clean install -e
