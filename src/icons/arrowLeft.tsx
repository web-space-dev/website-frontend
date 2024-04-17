import * as React from "react";
import { SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {
  fill?: string;
}

const ArrowLeft = (props: IProps) => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.75 10.9571L5.75001 15.9571L6.45712 15.25L0.75 9.54286L0.75 10.9571ZM0.75 8.75006L13.25 8.75006L13.25 7.75006L0.75 7.75006L0.75 8.75006ZM0.75 6.95711L6.45712 1.24999L5.75001 0.542879L0.75 5.54289L0.75 6.95711Z"
      fill={props.fill ? props.fill : "#1D1D1D"}
    />
  </svg>
);
export default ArrowLeft;
