import { GeocodeResponse, LocationResponse } from '@/types';

export async function getCurrentLocation(): Promise<LocationResponse> {
    let coords: GeolocationPosition | undefined;

    try {
        coords = (await getCoordinates()).coords;
    } catch (error) {
        // Permission denied by the browser to use Geolocation
        return {
            error: 'Please ensure your browser allows location access to continue',
        };
    }

    if (!coords) {
        // TODO: Handle permission error
        return {
            error: 'Permission denied',
        };
    }

    const { latitude, longitude } = coords;

    const addressData = await geocodeLatLng(latitude, longitude);

    const suburb = addressData.address_components.find((component) =>
        component.types.includes('sublocality')
    )?.long_name;

    const city = addressData.address_components.find((component) =>
        component.types.includes('locality')
    )?.long_name;

    const postCode = addressData.address_components.find((component) =>
        component.types.includes('postal_code')
    )?.long_name;

    const approximateLocation =
        (suburb && city && `${suburb}, ${city}`) ||
        addressData.formatted_address;

    if (!postCode) {
        return {
            error: 'There was an error finding your location, please try again',
        };
    }

    return {
        address: approximateLocation,
        postCode,
    };
}

export function getCoordinates(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export async function geocodeLatLng(
    lat: number,
    lng: number
): Promise<GeocodeResponse> {
    const res = await fetch('/api/geocode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lat,
            lng,
        }),
    });

    const { data }: { data: GeocodeResponse } = await res.json();

    return data;
}
