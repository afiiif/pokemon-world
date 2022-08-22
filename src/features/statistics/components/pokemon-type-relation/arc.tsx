import { ArcTooltipComponentProps } from '@nivo/chord';
import { memo } from 'react';

function ArcTooltip({ arc }: ArcTooltipComponentProps) {
  return (
    <div className="rounded-md bg-white p-2 text-xs text-typography-light shadow-md">
      <div className="flex items-center gap-2">
        <div style={{ background: arc.color }} className="h-3 w-3 rounded-full" />
        <div>
          {arc.id}: <b>{arc.value}</b>
        </div>
      </div>
    </div>
  );
}

const ArcTooltipMemoized = memo(
  ArcTooltip,
  (prevProps, nextProps) => prevProps.arc.id === nextProps.arc.id,
);

export default ArcTooltipMemoized;
