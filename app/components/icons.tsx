// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FunctionComponent } from "react";
import { FaCaretDown, FaCaretUp, FaMinus, FaPlus } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IconProps {
  onClick: () => void;
}

export const UpArrow: FunctionComponent<IconProps> = FaCaretDown;
export const DownArrow: FunctionComponent<IconProps> = FaCaretUp;
export const Plus: FunctionComponent<IconProps> = FaPlus;
export const Minus: FunctionComponent<IconProps> = FaMinus;
