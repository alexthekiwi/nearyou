import { useState } from 'react';
import NavBar from '@/Components/common/NavBar';
import { primaryLinks } from '@/lib/nav';
import PageHeader from '@/Components/common/PageHeader';
import H2 from '@/Components/typography/H2';
import ForestBg from '@/Components/forest/ForestBg';
import ForestDescription from '@/Components/forest/ForestDescription';

interface Props {
    trees: number;
}

export default function ForestComponent({ trees }: Props) {
    /**
     * 0: Starter (0 ~ 4)
     * 1: Beginner (5 ~ 14)
     * 2: Good (15 ~ 24)
     * 3: Excellent (25 ~ 44)
     * 4: Great (45)
     */
    const lv = (() => {
        if (trees >= 45) return 4;
        if (trees >= 25) return 3;
        if (trees >= 15) return 2;
        if (trees >= 5) return 1;
        return 0;
    })();

    const title = (() => {
        switch (lv) {
            case 0:
                return 'Starter';
            case 1:
                return 'Beginner';
            case 2:
                return 'Good';
            case 3:
                return 'Excellent';
            case 4:
                return 'Great';
            default:
                return 'Starter';
        }
    })();

    const [isShowForestDescription, setIsShowForestDescription] =
        useState(false);

    return (
        <div className="flex flex-col gap-y-4">
            <div className="text-center leading-8">
                <sub className="text-sm font-semibold">
                    Trade Well, Get Good Reviews,
                </sub>
                <H2>Plant a Tree!</H2>
            </div>

            <div className="mx-8 flex flex-col gap-1 font-semibold">
                <div className="flex h-9 gap-2 text-center leading-9 text-white">
                    <div className="text-md relative flex-1 overflow-hidden rounded-xl bg-stone-400">
                        <i
                            className={`absolute left-0 h-full rounded-xl ${
                                lv > 1 ? 'bg-teal' : 'bg-dirty-light'
                            }`}
                            style={{
                                width: `${(trees / 45) * 100}%`,
                            }}
                        />
                        {trees} Trees
                    </div>

                    <button
                        className="w-12 rounded-xl bg-teal-semi-light text-lg"
                        onClick={() => setIsShowForestDescription(true)}
                    >
                        ?
                    </button>
                </div>

                <div className="text-xs">
                    You are a{' '}
                    <strong
                        className={`font-extrabold ${
                            lv > 1 ? 'text-teal' : 'text-dirty'
                        }`}
                    >
                        {title} forester!
                    </strong>
                </div>
            </div>

            <div className="relative">
                <ForestBg trees={trees} lv={lv} />

                <div className="absolute left-0 top-0 w-8" />
            </div>

            {isShowForestDescription && (
                <ForestDescription
                    close={() => setIsShowForestDescription(false)}
                />
            )}
        </div>
    );
}
