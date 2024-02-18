import { CDN_PATH } from '@/constants';

type Props = {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    imgClassName?: string;
    pictureClassName?: string;
    pictureStyle?: React.CSSProperties;
};

export default function Picture({
    src,
    alt,
    width,
    height,
    imgClassName,
    pictureClassName,
    pictureStyle,
}: Props) {
    const thumbnail = `${CDN_PATH}${src}`;

    return (
        <picture className={pictureClassName} style={pictureStyle}>
            <source srcSet={`${thumbnail}.webp`} type="image/webp" />
            <source srcSet={`${thumbnail}.jpg`} type="image/jpeg" />
            <img
                className={imgClassName}
                src={`${thumbnail}.jpg`}
                alt={alt}
                width={width}
                height={height}
            />
        </picture>
    );
}
