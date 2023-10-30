import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { colors } from "../../utils/style";

interface StyledProps {
  wavesurferReady: boolean;
}
const WaveFormContainer = styled.div<StyledProps>`
  background-color: ${colors.dark};
  display: ${(props) => (props.wavesurferReady ? "block" : "none")};
`;

const DropZoneContainer = styled(WaveFormContainer)<StyledProps>`
  width: 100%;
  height: 128px;
  color: ${colors.dark};
  background-color: ${colors.light};
  border: dashed 5px ${colors.light};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  display: ${(props) => (props.wavesurferReady ? "none" : "flex")};

  span {
    cursor: default;
    color: #fdcc71;
    opacity: 0.3;
  }

  :hover {
    opacity: 0.6;
  }
`;
interface Props {
  initWavesurfer: (waveformRef: React.RefObject<HTMLDivElement>) => void;
  handleWaveformClick: () => void;
  handleZoom: (e: React.ChangeEvent<HTMLInputElement>) => void;
  zoomValue: number;
  handleDrop: (e: any) => void;
  wavesurferReady: boolean;
}

const InputContainer = styled.div<StyledProps>`
  margin-top: 10px;
  width: 387px;
  display: ${(props) => (props.wavesurferReady ? "block" : "none")};
`;

const WaveformWrapper: React.FC<Props> = ({
  initWavesurfer,
  handleWaveformClick,
  handleZoom,
  zoomValue,
  handleDrop,
  wavesurferReady,
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (waveformRef.current !== null) {
      initWavesurfer(waveformRef);
    }
  }, [initWavesurfer]);

  
  const middlebackGroundColor = {
    backgroundColor: '#370d1b', // background color in drag box
  };

  return (
    <>
    {/* drop box frontend */}
      <WaveFormContainer
        wavesurferReady={wavesurferReady}
        onMouseDown={handleWaveformClick}
        ref={waveformRef}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      />
      <DropZoneContainer
        ref={dropZoneRef}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
        wavesurferReady={wavesurferReady}        
        style={middlebackGroundColor}
      >
        <span>Drag and Drop Audio Hare</span>
      </DropZoneContainer>
      <InputContainer wavesurferReady={wavesurferReady}>
        <input
          type="range"
          min="20"
          max="1000"
          value={zoomValue}
          step="10"
          onChange={handleZoom}
        />
      </InputContainer>
    </>
  );
};

export default WaveformWrapper;
