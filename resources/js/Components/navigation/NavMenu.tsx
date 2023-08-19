import React from 'react';
import { HiBars2, HiXMark } from 'react-icons/hi2';
import DashNav from './DashNav';
import SetLocationForm from '../location/SetLocationForm';

export default function NavMenu() {
    const [isActive, setActive] = React.useState(false);

    function toggleActive(value: boolean | undefined = undefined) {
        setActive(value ?? !isActive);
    }

    const title = isActive ? 'Close menu' : 'Open menu';

    return (
        <div>
            <button
                title={title}
                type="button"
                onClick={() => toggleActive()}
                className="flex items-center justify-center transition-colors hover:text-teal"
            >
                {isActive ? (
                    <HiXMark className="h-8 w-8 text-teal" />
                ) : (
                    <HiBars2 className="h-8 w-8" />
                )}
            </button>

            {isActive && (
                <div className="fixed left-0 right-0 top-[80px] z-[100] flex h-[calc(100vh-80px)] flex-col gap-6 overflow-y-auto bg-white px-8 pb-16 pt-8 lg:pt-16">
                    <SetLocationForm className="mr-auto rounded-lg border border-teal px-3 py-3 pr-5 transition-colors hover:bg-teal-xlight" />
                    <DashNav />
                </div>
            )}
        </div>
    );
}
