import * as React from "react";
import { SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {
  fill?: string;
}

const ArrowRight = (props: IProps) => (
  <svg
    width="19.27"
    height="17.5"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.25 5.54292L8.24999 0.542907L7.54288 1.25001L13.25 6.95714L13.25 5.54292ZM13.25 7.74994L0.750027 7.74994L0.750027 8.74994L13.25 8.74994L13.25 7.74994ZM13.25 9.54289L7.54288 15.25L8.24999 15.9571L13.25 10.9571L13.25 9.54289Z"
      fill={props.fill ? props.fill : "#1D1D1D"}
    />
  </svg>
);
export default ArrowRight;
