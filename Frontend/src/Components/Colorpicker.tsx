import React from "react";
import { Col, ColorPicker, Divider, Row, theme } from "antd";
import type { ColorPickerProps } from "antd";
import { generate, green, presetPalettes, red, cyan } from "@ant-design/colors";

type Presets = Required<ColorPickerProps>["presets"][number];

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
  }));
export const Colorpicker = ({setColor,defValue}:any) => {

  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
    cyan,
  });

  const customPanelRender: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker, Presets } }
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <ColorPicker
      defaultValue={defValue}
      styles={{ popupOverlayInner: { width: 480 } }}
      presets={presets}
      panelRender={customPanelRender}
      // onChange={(e) => console.log(e.toHsb)}
      showText={(color: any) => {
        setColor(color.toHexString());
        return (
          <span
            style={{ fontWeight: "bold", color: "white" }}
          >{color.toHexString()}</span>
        );
      }}
    />
  );
};
