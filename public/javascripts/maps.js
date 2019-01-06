'use strict'

function getRadiiOf(type){
  return getShopDataOf(type);
}

function updateCircles(){
  var current = $('#heatmap .active').text()
  drawCircles(circleColor[current], getRadiiOf(current))
}

function drawCircles(color, radii){
  // Construct the circle for each value in citymap.
  // Note: We scale the area of the circle based on the population.

  clearCircles();

  for (var shop in shopmap) {
    // Add the circle for this shop to the map.
    var shopCircle = new google.maps.Circle({
      strokeColor: color,
      strokeOpashop: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpashop: 0.35,
      map: map,
      center: shopmap[shop].center,
      radius: radii[shop],
    });
    circles[shop] = shopCircle;
  }
}

// Math.sqrt(shopmap[shop].population) * 5

function dropMarkers() {
  clearMarkers();
  var i = 0;
  for (var shop in shopmap){
    addMarkerWithTimeout(shop, shopmap[shop].center, i * 200);
    i += 1;
  }
}

function addMarkerWithTimeout(shop, position, timeout) {
  let marker = new google.maps.Marker({
    title: shop,
    position: position,
    map: map,
    animation: google.maps.Animation.DROP
  })
  window.setTimeout(function() {
    markers.push(markers);
  }, timeout);
  google.maps.event.addListener(marker, "click", function() {
    if(confirm(`前往 ${ shop } 下單?`)){
      $('#order-food').click();
      menuOf(shop);
    }
  });
  google.maps.event.addListener(marker, "mouseover", function() {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  });
  google.maps.event.addListener(marker, 'mouseout', function() {
    marker.setAnimation(null);
  });

}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function clearCircles(){
  for(var k in circles){
    circles[k].setMap(null);
  }
}

function initMap(){

  map = new google.maps.Map(
    document.getElementById('map'), {
      // center: {lat: 24.986427, lng: 121.575684}, school
      center: {lat: 24.988027, lng: 121.576084},
      zoom: 16,
    });

  updateCircles();
}
