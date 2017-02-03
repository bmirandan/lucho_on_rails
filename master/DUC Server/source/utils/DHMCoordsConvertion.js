module.exports = {


    GetLatLngFromDMHCoords: function (Nort, East) {

        var P1LatLng = new google.maps.LatLng({
            lat: -22.39343,
            lng: -68.91208
        });

        var P1Meters = {
            E: 9240,
            N: 24006
        };

        var OffsetN = google.maps.geometry.spherical.computeOffset(P1LatLng, Nort - P1Meters.N, 0);
        var OffsetNE = google.maps.geometry.spherical.computeOffset(OffsetN, East - P1Meters.E, 90);

        return OffsetNE;
    }
}