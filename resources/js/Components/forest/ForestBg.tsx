interface Props {
    trees: number;
    lv: number;
}

export default function ForestBg({ trees, lv }: Props) {
    const fill1 = lv > 1 ? 'fill-[#6BBFFB]' : 'fill-[#F5C9A2]';

    const getRandom = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const pointInsideTriangle = (
        x: number,
        y: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number
    ) => {
        const denominator = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
        const a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator;
        const b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator;
        const c = 1 - a - b;

        return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
    };

    const overlapRect = (
        t1: number,
        r1: number,
        b1: number,
        l1: number,
        t2: number,
        r2: number,
        b2: number,
        l2: number
    ) => {
        const overlapX = !(r1 < l2 || l1 > r2);
        const overlapY = !(b1 < t2 || t1 > b2);

        return overlapX && overlapY;
    };

    const getPos = (): { x: number; y: number } => {
        const x = getRandom(0, 347 - 32);
        const y = getRandom(33, 333 - 40);

        if (
            pointInsideTriangle(x, y, 0, 0, 165, 0, 0, 165) || // 좌상단 흰 영역에 포함되지 않게
            pointInsideTriangle(x, y, 182, 0, 347, 0, 347, 165) || // 우상단 흰 영역에 포함되지 않게
            pointInsideTriangle(x, y, 250, 333, 347, 333, 347, 235) || // 우하단 흰 영역에 포함되지 않게
            overlapRect(y, x + 32, y + 40, x, 233, 120, 333, 0) // 좌하단 우물 등 영역에 포함되지 않게
        ) {
            return getPos();
        }

        return pointInsideTriangle(x, y, 0, 0, 165, 0, 0, 165)
            ? getPos()
            : { x, y };
    };

    console.log(
        'Random Point in Ellipse (excluding specified area):',
        getPos()
    );

    return (
        <svg
            className="w-full"
            width="347"
            height="333"
            viewBox="0 0 347 333"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="347" height="260" rx="100" fill="#B2EBF2" />
            <rect
                y="73"
                width="347"
                height="260"
                rx="100"
                className={lv > 1 ? 'fill-[#98DFDA]' : 'fill-[#F5C9A2]'}
            />
            <rect x="243" y="37" width="51" height="16" fill="url(#pattern0)" />
            <rect x="91" y="12" width="55" height="19" fill="url(#pattern1)" />
            <rect
                x="21"
                y="234"
                width="99"
                height="80"
                rx="40"
                className={lv > 1 ? 'fill-[#2CA2F7]' : 'fill-[#EA9549]'}
            />
            <rect
                x="40"
                y="257"
                width="16"
                height="1"
                rx="0.5"
                className={fill1}
            />
            <rect
                x="68"
                y="269"
                width="16"
                height="1"
                rx="0.5"
                className={fill1}
            />
            <rect
                x="92"
                y="260"
                width="16"
                height="1"
                rx="0.5"
                className={fill1}
            />
            <rect
                x="84"
                y="285"
                width="16"
                height="1"
                rx="0.5"
                className={fill1}
            />
            <rect
                x="56"
                y="296"
                width="16"
                height="1"
                rx="0.5"
                className={fill1}
            />
            <rect
                x="28"
                y="274"
                width="16"
                height="1"
                rx="0.5"
                className={fill1}
            />
            {Array.from({ length: trees }).map((_, i) => {
                const { x, y } = getPos();

                return (
                    <image
                        key={i}
                        href={`/img/forest/tree_type${getRandom(1, 7)}.png`}
                        width="32"
                        height="40"
                        x={x}
                        y={y}
                    />
                );
            })}
            <defs>
                <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <use
                        xlinkHref="#image0_2262_5281"
                        transform="matrix(0.00348584 0 0 0.0111111 -0.0124183 0)"
                    />
                </pattern>
                <pattern
                    id="pattern1"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <use
                        xlinkHref="#image1_2262_5281"
                        transform="matrix(0.00575758 0 0 0.0166667 -0.00378788 0)"
                    />
                </pattern>
                <image
                    id="image0_2262_5281"
                    width="294"
                    height="90"
                    xlinkHref="data:image/png;base64,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"
                />
                <image
                    id="image1_2262_5281"
                    width="175"
                    height="60"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
}
