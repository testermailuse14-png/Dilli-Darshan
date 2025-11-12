export const searchPlaces = (query, callback) => {
  if (!window.google) {
    callback([], null);
    return;
  }

  const service = new window.google.maps.places.AutocompleteService();

  service.getPlacePredictions(
    {
      input: query,
      componentRestrictions: { country: 'in' },
      types: ['establishment', 'point_of_interest'],
    },
    (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        callback(predictions, null);
      } else {
        callback([], status);
      }
    }
  );
};

export const getPlaceDetails = (placeId, callback) => {
  if (!window.google) {
    callback(null, null);
    return;
  }

  const service = new window.google.maps.places.PlacesService(
    document.createElement('div')
  );

  service.getDetails(
    {
      placeId: placeId,
      fields: [
        'name',
        'formatted_address',
        'geometry',
        'photos',
        'rating',
        'user_ratings_total',
        'reviews',
        'opening_hours',
        'website',
        'formatted_phone_number',
        'price_level',
        'types',
      ],
    },
    (result, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const placeData = {
          title: result.name,
          location: result.formatted_address,
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
          rating: result.rating,
          userRatingsTotal: result.user_ratings_total,
          reviews: result.reviews,
          hours: result.opening_hours?.weekday_text?.join(', ') || null,
          website: result.website,
          phone: result.formatted_phone_number,
          priceLevel: result.price_level,
          types: result.types,
          placeId: placeId,
        };
        callback(placeData, null);
      } else {
        callback(null, status);
      }
    }
  );
};

export const getNearbyPlaces = (lat, lng, type = 'cafe', radius = 1000, callback) => {
  if (!window.google) {
    callback([], null);
    return;
  }

  const service = new window.google.maps.places.PlacesService(
    document.createElement('div')
  );

  service.nearbySearch(
    {
      location: { lat, lng },
      radius: radius,
      type: type,
    },
    (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        callback(results, null);
      } else {
        callback([], status);
      }
    }
  );
};
