import { ReactElement } from "react";

export interface MenuProps {
  onPress: { (arg0: boolean): void };
}

export interface DialogProps {
  menuValue: boolean;
  onClose: { (arg0: boolean): void };
}

export interface SignupProps {
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  ref: React.MutableRefObject<undefined>;
}

export interface AuxProps {
  children: ReactElement | ReactElement[];
}
