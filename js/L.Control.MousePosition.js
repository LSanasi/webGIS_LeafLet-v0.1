L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomleft',
    separator: ' : ',
    emptyString: 'Unavailable',
    lngFirst: false,
    numDigits: 5,
    lngFormatter: undefined,
    latFormatter: undefined,
    prefix: ""
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML=this.options.emptyString;
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove)
  },

  _onMouseMove: function (e) {
    var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
    var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
  
    //var wgs84LatLng = e.latlng; // Latitude and longitude in WGS84 (EPSG:4326)
    
        // Perform coordinate transformation from WGS84 to EPSG:3003 using Proj4js
    //var epsg3003Coordinates = proj4('EPSG:3003', [wgs84LatLng.lng, wgs84LatLng.lat]);
    
    //var lng = this.options.lngFormatter ? this.options.lngFormatter(epsg3003Coordinates[0]) : L.Util.formatNum(epsg3003Coordinates[0], this.options.numDigits);
    //var lat = this.options.latFormatter ? this.options.latFormatter(epsg3003Coordinates[1]) : L.Util.formatNum(epsg3003Coordinates[1], this.options.numDigits);
    
    var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
    var prefixAndValue = this.options.prefix + ' ' + value;
    this._container.innerHTML = prefixAndValue;
  }
});

L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});

L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};
