import { ResponsiveChord, RibbonDatum } from '@nivo/chord';
import { useState } from 'react';

import { usePokemonStatistics } from '@/api/queries/pokemon-statistics';

import ArcTooltipMemoized from './arc';
import Detail from './detail';
import RibbonTooltipMemoized from './ribbon';

export default function PokemonTypeRelation() {
  const [activeRibbon, setActiveRibbon] = useState<RibbonDatum>();

  const statistics = usePokemonStatistics().data;

  if (!statistics) {
    return null;
  }

  const { keys, colors, data } = statistics;

  return (
    <div className="2xl:-mr-32 2xl:flex 2xl:items-center">
      <div className="aspect-square w-full flex-1 2xl:max-w-[calc(100%_-_14rem)]">
        <ResponsiveChord
          keys={keys}
          data={data}
          margin={{ top: 60, right: 60, bottom: 90, left: 60 }}
          padAngle={0.02}
          innerRadiusRatio={0.96}
          innerRadiusOffset={0.02}
          inactiveArcOpacity={0.25}
          arcBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.6]],
          }}
          activeRibbonOpacity={0.75}
          inactiveRibbonOpacity={0.25}
          ribbonBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.6]],
          }}
          labelRotation={-90}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1]],
          }}
          colors={colors}
          motionConfig="stiff"
          arcTooltip={ArcTooltipMemoized}
          ribbonTooltip={RibbonTooltipMemoized}
          onRibbonMouseEnter={setActiveRibbon}
        />
      </div>

      <Detail activeRibbon={activeRibbon} />
    </div>
  );
}
