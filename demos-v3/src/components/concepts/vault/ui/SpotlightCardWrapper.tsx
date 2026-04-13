'use client';

import React from 'react';
import { Player } from '@remotion/player';
import { SpotlightCard, type SpotlightCardProps } from './SpotlightCard';

interface SpotlightCardWrapperProps extends SpotlightCardProps {
  width?: number | string;
  aspectRatio?: string;
}

function Scene(props: SpotlightCardProps) {
  return <SpotlightCard {...props} />;
}

export function SpotlightCardWrapper({
  width = '100%',
  aspectRatio = '16 / 10',
  cardWidth = 480,
  cardHeight = 300,
  ...props
}: SpotlightCardWrapperProps) {
  return (
    <div style={{ width, aspectRatio, position: 'relative' }}>
      <Player
        component={Scene}
        durationInFrames={180}
        compositionWidth={cardWidth + 40}
        compositionHeight={cardHeight + 40}
        fps={30}
        controls={false}
        autoPlay
        loop
        clickToPlay={false}
        inputProps={{ cardWidth, cardHeight, ...props }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 16,
          overflow: 'hidden',
        }}
      />
    </div>
  );
}
