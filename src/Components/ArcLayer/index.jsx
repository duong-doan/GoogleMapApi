import DeckGL from "@deck.gl/react";
import { ArcLayer } from "@deck.gl/layers";

const ArcLayerDemo = ({ viewState, data, id }) => {
  const layer = new ArcLayer({
    id,
    data,
    pickable: true,
    getWidth: 12,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getSourceColor: (d) => [Math.sqrt(d.inbound), 140, 0],
    getTargetColor: (d) => [Math.sqrt(d.outbound), 140, 0],
  });

  return (
    <DeckGL
      viewState={viewState}
      layers={[layer]}
      getTooltip={({ object }) =>
        object && `${object.from.name} to ${object.to.name}`
      }
    />
  );
};

export default ArcLayerDemo;
