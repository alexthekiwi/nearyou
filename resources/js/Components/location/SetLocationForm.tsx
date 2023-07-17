import { router } from '@inertiajs/react';
import { MdMyLocation } from 'react-icons/md';
import Button from '../common/Button';
import { useSubmit } from '@/lib/forms';
import { useAuth } from '@/lib/auth';
import H3 from '../typography/H3';
import H4 from '../typography/H4';

interface Props {
    display?: 'default' | 'minimal';
}

export default function SetLocationForm({ display = 'default' }: Props) {
    const { location } = useAuth().user;

    const onSetLocation = useSubmit({ message: 'Location set successfully!' });
    const onUpdateLocation = useSubmit({
        message: 'Location updated successfully!',
    });

    function handleSetLocation() {
        router.post(route('location.store'), {}, onSetLocation);
    }

    function handleUpdateLocation() {
        if (!confirm('Are you sure you wish to update your location?')) {
            return;
        }

        router.put(route('location.update'), {}, onUpdateLocation);
    }

    const locationName = location ? location.name : 'Set location';

    const description = location
        ? `Your location is currently set to ${location.name}`
        : `You don't currently have a location set. Set one now?`;

    const buttonText = location ? 'Update location' : 'Set location';

    if (display === 'minimal') {
        return (
            <button
                className="flex items-center gap-3"
                onClick={location ? handleUpdateLocation : handleSetLocation}
            >
                <MdMyLocation className="h-6 w-6 text-teal" />
                {locationName}
            </button>
        );
    }

    return (
        <div className="flex flex-col gap-6 rounded-xl bg-teal-xlight p-8 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
                <MdMyLocation className="h-8 w-8 text-teal" />
                <h2 className="font-bold">{description}</h2>
            </div>
            <Button
                onClick={location ? handleUpdateLocation : handleSetLocation}
                theme="primary"
            >
                {buttonText}
            </Button>
        </div>
    );
}
