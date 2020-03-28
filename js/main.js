var latest_geo_location_country_code = "ERR";
var unknown_country_filename = "_united-nations";

function setIcon(country_code) {
    chrome.browserAction.setIcon({path: "img/flags/48/" + country_code + ".png"});
}

function checkForLocationChange(geo_location_country_code) {
    if (latest_geo_location_country_code == "ERR") {
        latest_geo_location_country_code = geo_location_country_code;
    } else if (latest_geo_location_country_code != geo_location_country_code) {
        notification = {
            type: 'basic',
            iconUrl: 'img/flags/48/' + geo_location_country_code +  '.png',
            title: 'Location update',
            message: "External ip changed. Country updated from " + latest_geo_location_country_code + " to " + geo_location_country_code,
            contextMessage: ""
        }

        chrome.notifications.create('geoLocationAlert' + Math.random(), notification, function(string){} );

        latest_geo_location_country_code = geo_location_country_code;
    }
}

function fetchGeoLocation() {
    fetch("https://airvpn.org/api/whatismyip/")
    .then( data => {
        return data.json()
      }
    )
    .then( res  => {
        checkForLocationChange(res.geo.code.toUpperCase())
        setIcon(res.geo.code.toUpperCase())
      }
    )
    .catch( err => {
        setIcon(unknown_country_filename);
      }
    )
}

function loading_ready() {
    fetchGeoLocation();
    var intval = setInterval(fetchGeoLocation, 3000);
};

loading_ready();
