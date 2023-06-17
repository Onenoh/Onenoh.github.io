
const inputAddress = document.querySelector(".ip-address");
const submitButton = document.querySelector(".btn");
const inputedIP = document.querySelector(".ip-input");
const inputLocation = document.querySelector(".ip-location");
const inputTimezone = document.querySelector(".ip-timezone");
const inputServiceValue = document.querySelector(".service-value");
const secret_api = 'at_ungcTcHy6qtlhIhisvfQkunMZE2Ot';
const map = L.map('map', {
  'center': [0, 0],
  'zoom': 5,
  'layers': [
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    })
  ]
});

const updateMarker = (update_marker = [6.5244, 3.3792]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};

const getIPDetails = (default_ip) => {
  let ip_url;
  if (!default_ip) {
    ip_url = `https://geo.ipify.org/api/v1?apiKey=${secret_api}`;
  } else {
    ip_url = `https://geo.ipify.org/api/v1?apiKey=${secret_api}&domain=${default_ip}`;
  }

  fetch(ip_url)
    .then((response) => response.json())
    .then((data) => {
      inputedIP.innerHTML = data.ip;
      inputLocation.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
      inputTimezone.innerHTML = `UTC${data.location.timezone}`;
      inputServiceValue.innerHTML = data.isp;

      updateMarker([data.location.lat, data.location.lng]);
    })
    .catch((error) => {
      alert("Unable to get IP details");
      console.log(error);
    });
};

document.addEventListener('load', updateMarker());

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputAddress.value != '' && inputAddress.value != null) {
    getIPDetails(inputAddress.value);
    return;
  }
  alert("Please enter a valid IP address or domain name");
});



