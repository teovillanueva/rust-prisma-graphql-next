import { ComponentProps } from "react";

export function IconButton(props: ComponentProps<"button">) {
  return (
    <button
      className="icon-button w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition-all"
      {...props}
    />
  );
}
