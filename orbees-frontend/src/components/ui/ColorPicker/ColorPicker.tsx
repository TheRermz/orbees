import { useState } from "react";
import {
  Wrapper,
  Swatches,
  Swatch,
  HexRow,
  HexSymbol,
  HexInput,
  ColorPreview,
} from "./ColorPicker.styles";
import { type ColorPickerProps } from "./interface";
import { SWATCHES } from "./data";
import { HexColorPicker } from "react-colorful";

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [hexInput, setHexInput] = useState(value.replace("#", ""));

  const handleChange = (color: string) => {
    onChange(color);
    setHexInput(color.replace("#", ""));
  };

  const handleSwatchClick = (color: string) => {
    handleChange(color);
  };

  const handleHexChange = (raw: string) => {
    setHexInput(raw);
    const clean = raw.replace(/[^0-9a-fA-F]/g, "");
    if (clean.length === 6) handleChange(`#${clean}`);
  };

  return (
    <Wrapper>
      <HexColorPicker color={value} onChange={handleChange} />
      <Swatches>
        {SWATCHES.map((color) => (
          <Swatch
            key={color}
            $color={color}
            $selected={value.toLowerCase() === color.toLowerCase()}
            onClick={() => handleSwatchClick(color)}
          />
        ))}
      </Swatches>
      <HexRow>
        <HexSymbol>#</HexSymbol>
        <HexInput
          value={hexInput}
          maxLength={6}
          onChange={(e) => handleHexChange(e.target.value)}
          placeholder="F5A623"
        />
        <ColorPreview $color={value} />
      </HexRow>
    </Wrapper>
  );
};
