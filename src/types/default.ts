import { ReactNode } from "react";

export interface BaseState {
  isFetching: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface TabInterface {
  component: ReactNode;
  index: number;
}
