import React, { PropsWithChildren } from 'react';
import { router } from '@inertiajs/react';
import { MdMyLocation } from 'react-icons/md';
import cn from 'classnames';
import Button from '../common/Button';
import { useSubmit } from '@/lib/forms';
import { useAuth } from '@/lib/auth';
import { getCurrentLocation } from '@/lib/location';
import { LocationResponse, Status } from '@/types';
import Modal from '../Modal';
import Loader from '../common/Loader';
import { useToast } from '@/lib/toast';

interface Props extends PropsWithChildren {
    onSuccess?: () => void;
    className?: string;
}

export default function SetLocationForm({
    onSuccess,
    className = '',
    children,
}: Props) {
    const { location } = useAuth().user;
    const { addToast } = useToast();

    const [status, setStatus] = React.useState<Status>('idle');
    const [locationResponse, setLocationResponse] =
        React.useState<LocationResponse>();

    const onSaveLocation = useSubmit({
        onError: (errors: any) => {
            if (errors.location) {
                setStatus('error');
                setLocationResponse((prev) => ({
                    ...prev,
                    error: errors.location,
                }));
            }
        },
        onSuccess: (res) => {
            addToast({
                message: res.props.success || 'Location saved successfully',
                status: 'success',
            });

            setStatus('idle');

            // Call the onSuccess prop if it exists
            onSuccess?.();
        },
    });

    async function handleUpdateLocation() {
        if (status === 'processing') return;

        setStatus('processing');
        const res = await getCurrentLocation();

        setLocationResponse(res);
        setStatus(res.error ? 'error' : 'success');
    }

    function handleSaveLocation() {
        if (!locationResponse || !locationResponse.postCode) return;

        router.post(
            route('location.store'),
            {
                postCode: locationResponse?.postCode,
            },
            onSaveLocation
        );
    }

    const locationName = location ? location.name : 'Set location';

    return (
        <button
            className={cn('flex items-center gap-3', className)}
            onClick={handleUpdateLocation}
        >
            {status === 'processing' ? (
                <Loader className="!h-6 !w-6 text-teal" />
            ) : (
                <MdMyLocation className="h-6 w-6 text-teal" />
            )}

            {locationName}

            {children}

            <Modal
                show={status === 'success' || status === 'error'}
                onClose={() => setStatus('idle')}
            >
                <div className="flex flex-col gap-6 p-6 font-bold">
                    {status === 'error' && (
                        <p className="text-lg text-red-500">
                            {locationResponse?.error}
                        </p>
                    )}
                    {status === 'success' && (
                        <p className="text-lg">
                            Please confirm your location:{' '}
                            {locationResponse?.address}
                        </p>
                    )}
                    <div className="flex justify-end gap-4">
                        <Button onClick={() => setStatus('idle')}>
                            {status === 'error' ? 'Go back' : 'Cancel'}
                        </Button>
                        {status === 'success' && (
                            <Button
                                onClick={handleSaveLocation}
                                theme="primary"
                            >
                                Confirm
                            </Button>
                        )}
                    </div>
                </div>
            </Modal>
        </button>
    );
}
