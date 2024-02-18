import { HiPhotograph } from 'react-icons/hi';
import { ChangeEvent, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { ImSpinner } from 'react-icons/im';
import { router } from '@inertiajs/react';
import './create.css';
import ProductLayout from '@/Layouts/ProductLayout';
import Button from '@/Components/common/Button';
import { getCurrentLocation } from '@/lib/location';

interface Props {
    //
}

export default function ListingsIndex({}: Props) {
    const [fileArr, setFileArr] = useState<[File, string][]>([]);
    const [fileBlobUrlArr, setFileBlobUrlArr] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState<number | null>(null);
    const [isFreecycle, setFreecycle] = useState(false);
    const [isShowDesscriptionPlaceholder, setShowDesscriptionPlaceholder] =
        useState(true);
    const [description, setDescription] = useState('');
    const [isShowTagPlaceholder, setShowTagPlaceholder] = useState(true);
    const [tagArr, setTagArr] = useState<string[]>([]);
    const [isFileUploading, setIsFileUploading] = useState(false);

    const censorshipImage = async (image: any): Promise<string | null> => {
        const res = await fetch(
            'https://36em0yut81.execute-api.ap-southeast-2.amazonaws.com/',
            {
                method: 'POST',
                body: image,
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        switch (res.status) {
            case 200: {
                const listingImageId = await res.text();

                console.log({ listingImageId });

                return listingImageId;
            }
            case 451: {
                alert(await res.text());

                break;
            }
            default:
                console.log('unknown error');
                break;
        }

        return null;
    };

    const getFile = async ({ files }: HTMLInputElement) => {
        if (fileArr.length >= 7) {
            alert('You can upload up to 7 images.');
        } else if (files) {
            let newFileArr = [...fileArr];
            let newFileBlobArr = [...fileBlobUrlArr];

            try {
                if (isFileUploading) {
                    alert('Please wait until the upload is complete.');
                } else {
                    setIsFileUploading(true);

                    await Array.from(files).reduce(async (promise, file) => {
                        await promise;

                        if (newFileArr.length >= 7) {
                            throw new Error('You can upload up to 7 images.');
                        }

                        const listingImageId = await censorshipImage(file);

                        if (listingImageId) {
                            newFileArr = newFileArr.concat([
                                [file, listingImageId],
                            ]);

                            setFileArr(newFileArr);

                            newFileBlobArr = newFileBlobArr.concat([
                                URL.createObjectURL(file),
                            ]);

                            setFileBlobUrlArr(newFileBlobArr);
                        }
                    }, Promise.resolve());
                }
            } catch (e) {
                if (e instanceof Error) {
                    alert(e.message);
                } else {
                    console.error(e);

                    alert('Unknown error');
                }
            } finally {
                setIsFileUploading(false);
            }
        }
    };

    const rmvFile = (idx: number) => {
        setFileArr([...fileArr.slice(0, idx), ...fileArr.slice(idx + 1)]);

        setFileBlobUrlArr([
            ...fileBlobUrlArr.slice(0, idx),
            ...fileBlobUrlArr.slice(idx + 1),
        ]);
    };

    const changePrice = ({ target }: ChangeEvent) => {
        const $input = target as HTMLInputElement;

        const value = parseInt($input.value.replace(/\D/g, ''));

        if (Number.isNaN(value)) {
            $input.value = '';

            setPrice(null);
        } else {
            $input.value = value.toLocaleString();

            setPrice(value);
        }
    };

    let isSending = false;

    const post = (e: React.FormEvent) => {
        e.preventDefault();

        if (isSending) return;

        isSending = true;

        try {
            if (isFileUploading) {
                alert('Please wait until the upload is complete.');
            } else if (!fileArr.length) {
                alert('Please upload at least one image.');
            } else if (!title) {
                alert('Please enter a title.');
            } else if (
                (price === null || Number.isNaN(price) || price < 0) &&
                !isFreecycle
            ) {
                alert('Please enter a price.');
            } else if (!description) {
                alert('Please enter a description.');
            } else {
                // let postCode;
                // let suburb;

                // const res = await getCurrentLocation();

                // if (res.error) {
                //     alert(res.error);
                // } else {
                //     if (res.postCode) postCode = res.postCode;

                //     if (res.suburb) suburb = res.suburb;
                // }

                router.post(route('listings.store'), {
                    fileArr: fileArr.map((f) => f[1]),
                    title,
                    price: isFreecycle ? 0 : price,
                    description,
                    tagArr,
                    postCode: '1062',
                    suburb: 'OTAHUHU',
                });
            }
        } finally {
            isSending = false;
        }
    };

    return (
        <ProductLayout title="Posting">
            <form onSubmit={post} className="gap-0">
                <div className="grid grid-cols-4 gap-y-4 border-b border-white-dirty px-6 pb-10">
                    <button
                        type="button"
                        className="relative flex h-[70px] w-[70px] flex-col items-center justify-center justify-self-center bg-white-dirty text-xs"
                        style={{
                            borderRadius: '10px',
                            color: '#868687',
                        }}
                    >
                        <HiPhotograph
                            className="h-[25px] w-[25px]"
                            fill="#868687"
                        />
                        {fileArr.length} / 7
                        <input
                            className="!absolute h-full w-full opacity-0"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => getFile(e.target)}
                        />
                    </button>
                    {fileBlobUrlArr.map((e, i) => (
                        <div className="relative h-[70px] w-[70px] justify-self-center">
                            <img
                                className="h-full w-full object-cover"
                                style={{
                                    borderRadius: '10px',
                                }}
                                src={e}
                                alt={`Product detail ${i + 1}`}
                            />

                            <button
                                type="button"
                                className="absolute right-[-7px] top-[-7px] grid h-[22px] w-[22px] place-items-center rounded-full"
                                style={{
                                    backgroundColor: '#D9D9D9',
                                }}
                                onClick={() => rmvFile(i)}
                            >
                                <HiXMark />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="relative h-[70px] w-[70px] items-center justify-center justify-self-center"
                        style={{
                            display: isFileUploading ? 'flex' : 'none',
                            border: '1px solid #e0e0e0',
                            borderRadius: '10px',
                            backgroundColor: '#eee',
                        }}
                    >
                        <ImSpinner
                            className="h-[25px] w-[25px] animate-spin"
                            fill="#868687"
                        />
                    </button>
                </div>

                <div className="h-[60px] border-b border-white-dirty">
                    <input
                        className="text-lg"
                        type="text"
                        placeholder="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className="flex h-[60px] border-b border-white-dirty">
                    <input
                        className="text-lg"
                        type="text"
                        placeholder="$ Price"
                        disabled={isFreecycle}
                        style={{
                            color: isFreecycle ? '#C7C7C7' : '#000',
                        }}
                        onChange={changePrice}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                    />

                    <button
                        type="button"
                        className={`h-full w-full border-l border-white-dirty px-6 text-right text-lg ${
                            isFreecycle ? 'font-bold' : ''
                        }`}
                        onClick={() => setFreecycle(!isFreecycle)}
                        style={{
                            color: isFreecycle ? '#000' : '#C7C7C7',
                        }}
                    >
                        Freecycle
                    </button>
                </div>

                <div className="relative h-[390px] border-b">
                    <textarea
                        className="h-full w-full px-6 py-4 text-lg"
                        onFocus={() => setShowDesscriptionPlaceholder(false)}
                        onBlur={() =>
                            !description && setShowDesscriptionPlaceholder(true)
                        }
                        onChange={({ target }) => setDescription(target.value)}
                    />

                    <p
                        className="pointer-events-none absolute left-6 top-4 text-lg"
                        style={{
                            display: isShowDesscriptionPlaceholder
                                ? 'block'
                                : 'none',
                            width: 'calc(100% - 3rem)',
                            color: '#C7C7C7',
                        }}
                    >
                        Post your product.
                        <ul>
                            <li className="flex">
                                Please provide details for a transaction that
                                can be trusted.
                            </li>

                            <li className="flex">
                                Posting explicit or illegal items could be
                                subject to restrictions.
                            </li>
                        </ul>
                    </p>
                </div>

                <div className="relative mb-[18px] h-[130px] border-b px-5 py-4">
                    <ul className="">
                        {tagArr.map((e, i) => (
                            <li
                                className="mb-2 mr-2 inline-block h-8 rounded-md bg-white-dirty font-bold"
                                style={{
                                    color: '#868687',
                                }}
                            >
                                <button
                                    type="button"
                                    className="h-full w-full p-1"
                                    onClick={() =>
                                        setTagArr([
                                            ...tagArr.slice(0, i),
                                            ...tagArr.slice(i + 1),
                                        ])
                                    }
                                >
                                    #{e}
                                </button>
                            </li>
                        ))}
                        <li className="inline-block h-8">
                            <input
                                className="rounded-md !p-0"
                                style={{
                                    boxShadow: 'none',
                                    outline: 'none',
                                    border: isShowTagPlaceholder
                                        ? 'none'
                                        : '1px solid rgb(0 0 0 / 10%)',
                                }}
                                type="text"
                                onFocus={() => setShowTagPlaceholder(false)}
                                onBlur={() =>
                                    !tagArr.length &&
                                    setShowTagPlaceholder(true)
                                }
                                onKeyDown={(e) => {
                                    const {
                                        key,
                                        target,
                                        nativeEvent: { isComposing },
                                    } = e;

                                    if (key === 'Enter') {
                                        e.preventDefault();
                                    }

                                    const $input = target as HTMLInputElement;
                                    const value = $input.value.trim();

                                    if (
                                        value &&
                                        !isComposing &&
                                        key === 'Enter'
                                    ) {
                                        if (tagArr.length < 3) {
                                            setTagArr([...tagArr, value]);

                                            $input.value = '';
                                        }
                                    }
                                }}
                            />
                        </li>
                    </ul>
                    <p
                        className="pointer-events-none absolute left-6 top-4 text-lg"
                        style={{
                            display: isShowTagPlaceholder ? 'block' : 'none',
                            width: 'calc(100% - 3rem)',
                            color: '#C7C7C7',
                        }}
                    >
                        #Tag
                        <br />
                        <small>(Maximum 3 Tags)</small>
                    </p>
                </div>

                <div className="px-6">
                    <Button type="submit" className="w-full" theme="primary">
                        Post
                    </Button>
                </div>
            </form>
        </ProductLayout>
    );
}
