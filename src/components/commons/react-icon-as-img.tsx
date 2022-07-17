import svgToTinyDataUri from 'mini-svg-data-uri';
import { renderToString } from 'react-dom/server';
import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  alt?: string;
  size?: number;
  color?: string;
};

export default function ReactIconAsImg({
  icon: Icon,
  alt = 'Icon',
  size = 24,
  color = '#374151',
  ...props
}: Props & JSX.IntrinsicElements['img']) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={svgToTinyDataUri(renderToString(<Icon />))
        .replace('currentColor', encodeURIComponent(color))
        .replace(/'1em'/g, `'${2 * size}px'`)}
      alt={alt}
      width={size}
      height={size}
      {...props}
    />
  );
}
