import Modal from '@/Components/Modal';

export default function SoldItFirstModal({ close }: { close: () => void }) {
    return (
        <Modal show closeable={false}>
            <div className="px-5 py-10">
                <p className="mb-10 text-center text-lg font-semibold text-gray-400">
                    Reviews can be written after the item is sold.
                </p>

                <button
                    className="w-full rounded-lg bg-teal py-3 font-semibold text-white"
                    onClick={close}
                >
                    Yes
                </button>
            </div>
        </Modal>
    );
}
