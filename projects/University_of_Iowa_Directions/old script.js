document.addEventListener('DOMContentLoaded', function () {
    const roomsList = document.getElementById('rooms-list');
    const searchBar = document.getElementById('search-bar');

    const roomsData = [
        {
            "Location": "ADLER JOURNALISM",
            "Room Number": "10",
            "Directions": "Start Point and Direction:\nLocate the elevator near the entrance and take it to the basement floor. Exit the elevator and turn left. Room EB01 is the first door on your right.",
            "Image": "path/to/image1.jpg"
        },
        {
            "Location": "ADVANCEMENT SERVICES BUILDING",
            "Room Number": "G20",
            "Directions": "Start Point and Direction:\nPark in lot 15, enter the building from the main entrance. Take the first right down the hallway. Room G20 is at the end of the hallway on the left.",
            "Image": "path/to/image2.jpg"
        },
        {
            "Location": "ARTS BUILDING WEST",
            "Room Number": "222",
            "Directions": "Start Point and Direction:\nEnter the building through the main entrance. Take the stairs on your right to the second floor. Room 222 is the third door on the left.",
            "Image": "path/to/image3.jpg"
        },
        {
            "Location": "BOWEN SCIENCE BUILDING",
            "Room Number": "W256",
            "Directions": "Start Point and Direction:\nEnter through the west entrance and walk straight down the hallway. Take the second left. Room W256 is on your right.",
            "Image": "path/to/image4.jpg"
        },
        {
            "Location": "BURGE HALL",
            "Room Number": "120",
            "Directions": "Start Point and Direction:\nEnter through the north entrance. Room 120 is directly ahead, next to the reception desk.",
            "Image": "path/to/image5.jpg"
        },
        {
            "Location": "CAPITOL CENTRE",
            "Room Number": "A12",
            "Directions": "Start Point and Direction:\nEnter the building from Capitol Street entrance. Room A12 is on the first floor, right after the lobby.",
            "Image": "path/to/image6.jpg"
        },
        {
            "Location": "CHEMISTRY BUILDING",
            "Room Number": "B45",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Take the elevator to the basement. Room B45 is on the left, next to the storage room.",
            "Image": "path/to/image7.jpg"
        },
        {
            "Location": "COMMUNICATIONS CENTER",
            "Room Number": "C22",
            "Directions": "Start Point and Direction:\nEnter the building through the south entrance. Room C22 is on the second floor, right at the top of the stairs.",
            "Image": "path/to/image8.jpg"
        },
        {
            "Location": "DENTAL SCIENCE BUILDING",
            "Room Number": "D303",
            "Directions": "Start Point and Direction:\nEnter through the east entrance. Take the elevator to the third floor. Room D303 is at the end of the hallway, on the left.",
            "Image": "path/to/image9.jpg"
        },
        {
            "Location": "ENGINEERING BUILDING",
            "Room Number": "E415",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Take the stairs to the fourth floor. Room E415 is the first door on your right.",
            "Image": "path/to/image10.jpg"
        },
        {
            "Location": "GILMORE HALL",
            "Room Number": "G102",
            "Directions": "Start Point and Direction:\nEnter through the west entrance. Take the first right down the hallway. Room G102 is on your left, next to the conference room.",
            "Image": "path/to/image11.jpg"
        },
        {
            "Location": "HANCHER AUDITORIUM",
            "Room Number": "H115",
            "Directions": "Start Point and Direction:\nEnter through the main lobby. Take the first left and go down the hallway. Room H115 is on your right.",
            "Image": "path/to/image12.jpg"
        },
        {
            "Location": "HARDIN LIBRARY",
            "Room Number": "L200",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Take the elevator to the second floor. Room L200 is directly ahead as you exit the elevator.",
            "Image": "path/to/image13.jpg"
        },
        {
            "Location": "HILLS BANK AND TRUST",
            "Room Number": "B101",
            "Directions": "Start Point and Direction:\nEnter the building from the west entrance. Room B101 is on the first floor, directly across from the entrance.",
            "Image": "path/to/image14.jpg"
        },
        {
            "Location": "HUBBARD PARK",
            "Room Number": "H12",
            "Directions": "Start Point and Direction:\nEnter the park from the north entrance. Room H12 is near the central fountain, on the left.",
            "Image": "path/to/image15.jpg"
        },
        {
            "Location": "IOWA ADVANCED TECHNOLOGY LABORATORIES",
            "Room Number": "IATL 12",
            "Directions": "Start Point and Direction:\nEnter through the east entrance. Room IATL 12 is on the first floor, next to the main lab.",
            "Image": "path/to/image16.jpg"
        },
        {
            "Location": "JESUP HALL",
            "Room Number": "J301",
            "Directions": "Start Point and Direction:\nEnter through the south entrance. Take the stairs to the third floor. Room J301 is the last door on the right.",
            "Image": "path/to/image17.jpg"
        },
        {
            "Location": "KUIF RADIO STATION",
            "Room Number": "K201",
            "Directions": "Start Point and Direction:\nEnter through the front entrance. Take the elevator to the second floor. Room K201 is on your left as you exit the elevator.",
            "Image": "path/to/image18.jpg"
        },
        {
            "Location": "LAW BUILDING",
            "Room Number": "L111",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Room L111 is on the first floor, near the library entrance.",
            "Image": "path/to/image19.jpg"
        },
        {
            "Location": "MACBRIDE HALL",
            "Room Number": "M209",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Take the elevator to the second floor. Room M209 is on your left.",
            "Image": "path/to/image20.jpg"
        },
        {
            "Location": "NURSING BUILDING",
            "Room Number": "N401",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Take the stairs to the fourth floor. Room N401 is the first door on your right.",
            "Image": "path/to/image21.jpg"
        },
        {
            "Location": "PHYSICS BUILDING",
            "Room Number": "P101",
            "Directions": "Start Point and Direction:\nEnter through the north entrance. Room P101 is on the first floor, near the lecture hall.",
            "Image": "path/to/image22.jpg"
        },
        {
            "Location": "QUAD CITIES CENTER",
            "Room Number": "Q202",
            "Directions": "Start Point and Direction:\nEnter the building from the south entrance. Take the elevator to the second floor. Room Q202 is on the right.",
            "Image": "path/to/image23.jpg"
        },
        {
            "Location": "RECREATION BUILDING",
            "Room Number": "R301",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Take the stairs to the third floor. Room R301 is at the end of the hallway on the left.",
            "Image": "path/to/image24.jpg"
        },
        {
            "Location": "SCIENCE LIBRARY",
            "Room Number": "S102",
            "Directions": "Start Point and Direction:\nEnter through the west entrance. Room S102 is on the first floor, near the computer lab.",
            "Image": "path/to/image25.jpg"
        },
        {
            "Location": "TILE OFFICE",
            "Room Number": "T212",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Take the elevator to the second floor. Room T212 is on your left.",
            "Image": "path/to/image26.jpg"
        },
        {
            "Location": "UIHC GENERAL HOSPITAL",
            "Room Number": "U104",
            "Directions": "Start Point and Direction:\nEnter through the main lobby. Take the first left and go down the hallway. Room U104 is on your right.",
            "Image": "path/to/image27.jpg"
        },
        {
            "Location": "VAN ALLEN HALL",
            "Room Number": "VA301",
            "Directions": "Start Point and Direction:\nEnter through the south entrance. Take the elevator to the third floor. Room VA301 is on your left.",
            "Image": "path/to/image28.jpg"
        },
        {
            "Location": "WATER TOWER PLACE",
            "Room Number": "W102",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Room W102 is on the first floor, near the information desk.",
            "Image": "path/to/image29.jpg"
        },
        {
            "Location": "X-RAY LAB",
            "Room Number": "X200",
            "Directions": "Start Point and Direction:\nEnter through the west entrance. Take the stairs to the second floor. Room X200 is on your right.",
            "Image": "path/to/image30.jpg"
        },
        {
            "Location": "YOUNG CHILDREN CENTER",
            "Room Number": "Y105",
            "Directions": "Start Point and Direction:\nEnter through the main entrance. Room Y105 is on the first floor, next to the play area.",
            "Image": "path/to/image31.jpg"
        },
        {
            "Location": "ZOOLOGY BUILDING",
            "Room Number": "Z101",
            "Directions": "Start Point and Direction:\nEnter through the north entrance. Room Z101 is on the first floor, near the lab.",
            "Image": "path/to/image32.jpg"
        }
        // Add more room data extracted from the Excel sheet
    ];

    function displayRooms(rooms) {
        roomsList.innerHTML = '';
        rooms.forEach((room, index) => {
            const roomDiv = document.createElement('div');
            roomDiv.classList.add('room-item');
            roomDiv.innerHTML = `
                <h3>${room.Location}</h3>
                <p>Room Number: ${room['Room Number']}</p>
                <button onclick="showDirections(${index})">Show Directions</button>
                <div id="directions-${index}" class="directions" style="display: none;">
                    <p>${room.Directions}</p>
                    <img src="${room.Image}" alt="Room Image">
                </div>
            `;
            roomsList.appendChild(roomDiv);
        });
    }

    displayRooms(roomsData);

    searchBar.addEventListener('keyup', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredRooms = roomsData.filter(room => {
            return (
                room.Location.toLowerCase().includes(searchTerm) ||
                room['Room Number'].toLowerCase().includes(searchTerm)
            );
        });
        displayRooms(filteredRooms);
    });
});

function showDirections(index) {
    const directionsDiv = document.getElementById(`directions-${index}`);
    if (directionsDiv.style.display === 'none') {
        directionsDiv.style.display = 'block';
    } else {
        directionsDiv.style.display = 'none';
    }
}