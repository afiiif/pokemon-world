import svgToTinyDataUri from 'mini-svg-data-uri';
import { renderToString } from 'react-dom/server';
import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  alt?: string;
  width?: number;
  height?: number;
  color?: string;
};

export default function ReactIconAsImg({
  icon: Icon,
  alt = 'Icon',
  width = 24,
  height = 24,
  color = '#374151',
  ...props
}: Props & JSX.IntrinsicElements['img']) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={svgToTinyDataUri(renderToString(<Icon />)).replace(
        'currentColor',
        encodeURIComponent(color),
      )}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
