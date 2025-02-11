import { HTMLAttributes } from "react";

export default interface PageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: string;
}