import { ComponentProps } from "react";

type CardProps = ComponentProps<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={
        // Note: Its probably a better idea to use a package like `classnames`
        "flex flex-wrap md:w-96 p-3 rounded-md bg-white shadow-sm items-center space-x-2 " +
        className
      }
      {...props}
    />
  );
}
