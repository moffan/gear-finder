import React, { FunctionComponent } from "react";

interface IconProps {
  size: string;
  style: any;
  onClick: () => void;
}

export const UpArrow: FunctionComponent<IconProps> = () => <>/\</>;
export const DownArrow: FunctionComponent<IconProps> = () => <>\/</>;
export const Plus: FunctionComponent<IconProps> = () => <>\/</>;
export const Minus: FunctionComponent<IconProps> = () => <>\/</>;
