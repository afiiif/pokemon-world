import { RibbonTooltipComponentProps } from '@nivo/chord';
import { memo } from 'react';

function RibbonTooltip({ ribbon }: RibbonTooltipComponentProps) {
  const { source, target } = ribbon;

  return (
    <div className="rounded-md bg-white p-2 text-xs text-typography-light shadow-md">
      {source.id === target.id ? (
        <div className="flex items-center gap-2">
          <div style={{ background: source.color }} className="h-3 w-3 rounded-full" />
          <div>
            Pure {source.id}: <b>{source.value}</b>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div style={{ background: source.color }} className="h-3 w-3 rounded-full" />
          <div style={{ background: target.color }} className="ml-0.5 mr-2 h-3 w-3 rounded-full" />
          <div>
            {source.id}-{target.id}: <b>{source.value}</b>
          </div>
        </div>
      )}
    </div>
  );
}

const RibbonTooltipMemoized = memo(
  RibbonTooltip,
  (prevProps, nextProps) => prevProps.ribbon.id === nextProps.ribbon.id,
);

export default RibbonTooltipMemoized;
