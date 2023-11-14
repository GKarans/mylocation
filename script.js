let map;
let socket;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 8,
    });

    socket = io();

    // Call the function to update the live location
    updateLiveLocation();
}

function updateLiveLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const newPosition = new google.maps.LatLng(latitude, longitude);

                // Update the map marker
                updateMapMarker(newPosition);

                // Send the updated location to the server
                socket.emit('updateLocation', { latitude, longitude });
            },
            error => {
                console.error('Error getting live location:', error);
            },
            { enableHighAccuracy: true }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

function updateMapMarker(position) {
    if (!map.marker) {
        // Create a marker if it doesn't exist
        map.marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Your Location',
        });
    } else {
        // Move the existing marker to the new position
        map.marker.setPosition(position);
    }
}

// Listen for updates from other users
socket.on('locationUpdated', (location) => {
    const { latitude, longitude } = location;
    const newPosition = new google.maps.LatLng(latitude, longitude);

    // Update the map marker for the other user
    updateOtherUserMarker(newPosition);
});

function updateOtherUserMarker(position) {
    if (!map.otherUserMarker) {
        // Create a marker for the other user if it doesn't exist
        map.otherUserMarker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Other User Location',
            // You can customize the icon for the other user here
            // icon: 'path-to-other-user-icon.png',
        });
    } else {
        // Move the existing marker to the new position
        map.otherUserMarker.setPosition(position);
    }
}
