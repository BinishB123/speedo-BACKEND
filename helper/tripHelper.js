import geolib from 'geolib'

const calculateTotalDistance = (gpsData) => {
    let totalDistance = 0;
  
    for (let i = 0; i < gpsData.length - 1; i++) {
      if (gpsData[i].ignition === 'on' && gpsData[i + 1].ignition === 'on') {
        const currentPoint = {
          latitude: gpsData[i].latitude,
          longitude: gpsData[i].longitude
        };
  
        const nextPoint = {
          latitude: gpsData[i + 1].latitude,
          longitude: gpsData[i + 1].longitude
        };
  
        const distance = geolib.getDistance(currentPoint, nextPoint);
        totalDistance += distance;
      }
    }
  
    return totalDistance; 
  };



  const calculateTravelDuration = (gpsData) => {
    const filteredData = gpsData.gpsData.filter(point => point.ignition === "on");
    if (filteredData.length < 2) return 

    const startTime = new Date(filteredData[0].timestamp);
    const endTime = new Date(filteredData[filteredData.length - 1].timestamp);

    const durationMs = endTime - startTime;

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

    return `${hours}Hr ${minutes}m ${seconds}s`;
};


const calculateOverSpeedingDuration = (gpsData, speedLimit = 60) => {
    let totalOverspeedDurationMs = 0;

    for (let i = 0; i < gpsData.gpsData.length - 1; i++) {
        const currentPoint = gpsData.gpsData[i];
        const nextPoint = gpsData.gpsData[i + 1];

        if (!currentPoint.latitude || !currentPoint.longitude || !currentPoint.timestamp ||
            !nextPoint.latitude || !nextPoint.longitude || !nextPoint.timestamp) {
            continue;
        }

        // Calculate distance (in meters)
        const distance = geolib.getDistance(
            { latitude: currentPoint.latitude, longitude: currentPoint.longitude },
            { latitude: nextPoint.latitude, longitude: nextPoint.longitude }
        );
        
        // Calculate time difference (in seconds)
        const timeDiffSeconds = (new Date(nextPoint.timestamp) - new Date(currentPoint.timestamp)) / 1000;

        if (timeDiffSeconds <= 0) continue; // Avoid division by zero

        // Calculate speed (in km/h)
        const speed = (distance / 1000) / (timeDiffSeconds / 3600); 

        // If speed exceeds the limit, add to overspeeding duration
        if (speed > speedLimit) {
            totalOverspeedDurationMs += timeDiffSeconds * 1000; // Convert seconds to milliseconds
        }
    }

    // Convert total overspeeding duration to hours, minutes, and seconds
    const hours = Math.floor(totalOverspeedDurationMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalOverspeedDurationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalOverspeedDurationMs % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
};




const calculateOverSpeedingDistance = (gpsData, speedLimit = 60) => {
    let totalOverspeedDistance = 0; 

    for (let i = 0; i < gpsData.gpsData.length - 1; i++) {
        const currentPoint = gpsData.gpsData[i];
        const nextPoint = gpsData.gpsData[i + 1];

        if (!currentPoint.latitude || !currentPoint.longitude || !currentPoint.timestamp ||
            !nextPoint.latitude || !nextPoint.longitude || !nextPoint.timestamp) {
            continue;
        }

       const distance = geolib.getDistance(
            { latitude: currentPoint.latitude, longitude: currentPoint.longitude },
            { latitude: nextPoint.latitude, longitude: nextPoint.longitude }
        );

        // Calculate time difference (seconds)
        const timeDiffSeconds = (new Date(nextPoint.timestamp) - new Date(currentPoint.timestamp)) / 1000;
        if (timeDiffSeconds <= 0) continue; // Avoid division by zero

        // Calculate speed (km/h)
        const speed = (distance / 1000) / (timeDiffSeconds / 3600);


        if (speed > speedLimit) {
            totalOverspeedDistance += distance;
        }
    }

    return totalOverspeedDistance; //  Returns total overspeeding distance in meters
};

const calculateStoppedDuration = (gpsData) => {
    let totalStoppedTime = 0;
  
    for (let i = 0; i < gpsData.gpsData.length - 1; i++) {
        const currentPoint = gpsData.gpsData[i];
        const nextPoint = gpsData.gpsData[i + 1];

        if (!currentPoint.timestamp || !nextPoint.timestamp) {
            console.warn("Skipping invalid data point:", currentPoint, nextPoint);
            continue;
        }

        const timeDiffSeconds = (new Date(nextPoint.timestamp) - new Date(currentPoint.timestamp)) / 1000;

        // If ignition is OFF or speed is 0, count as stopped time
        if (currentPoint.ignition === 'off' || currentPoint.speed === 0) {
            totalStoppedTime += timeDiffSeconds;
        }
    }

    // Convert seconds to hours, minutes, and seconds
    const hours = Math.floor(totalStoppedTime / 3600);
    const minutes = Math.floor((totalStoppedTime % 3600) / 60);
    const seconds = Math.floor(totalStoppedTime % 60);

    return `${hours}Hr ${minutes}m ${seconds}s`;
};



const calculateOverSpeedingPoints = (gpsData, speedLimit = 60) => {
    let totalOverspeedDurationMs = 0;
    let totalOverspeedDistance = 0;
    let overspeedingPoints = [];

    for (let i = 0; i < gpsData.gpsData.length - 1; i++) {
        const currentPoint = gpsData.gpsData[i];
        const nextPoint = gpsData.gpsData[i + 1];

        
        if (!currentPoint.latitude || !currentPoint.longitude || !currentPoint.timestamp ||
            !nextPoint.latitude || !nextPoint.longitude || !nextPoint.timestamp) {
            continue;
        }

        if (currentPoint.ignition === "off" || nextPoint.ignition === "off") {
            continue;
        }

        if (currentPoint.latitude === nextPoint.latitude && currentPoint.longitude === nextPoint.longitude) {
            continue;
        }

        const distance = geolib.getDistance(
            { latitude: currentPoint.latitude, longitude: currentPoint.longitude },
            { latitude: nextPoint.latitude, longitude: nextPoint.longitude }
        );

        const timeDiffSeconds = (new Date(nextPoint.timestamp) - new Date(currentPoint.timestamp)) / 1000;

        if (timeDiffSeconds <= 0) continue; 

        const speed = (distance / 1000) / (timeDiffSeconds / 3600);

        if (speed > speedLimit) {
            totalOverspeedDurationMs += timeDiffSeconds * 1000;
            totalOverspeedDistance += distance;
            
            overspeedingPoints.push({
                latitude: currentPoint.latitude,
                longitude: currentPoint.longitude,
                timestamp: currentPoint.timestamp,
                speed: speed.toFixed(2) + " km/h"
            });
        }
    }

    return {
        overspeedingPoints
    };
};
;




export  {calculateOverSpeedingPoints,calculateTotalDistance,calculateTravelDuration,calculateOverSpeedingDuration,calculateOverSpeedingDistance,calculateStoppedDuration}


// const totalDistanceInMeters = calculateTotalDistance(gpsData);
// console.log(`Total Distance Traveled: ${totalDistanceInMeters} meters`);

// // Optionally, convert meters to kilometers:
// console.log(`Total Distance Traveled: ${(totalDistanceInMeters / 1000).toFixed(2)} km`);