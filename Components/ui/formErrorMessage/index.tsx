import { cn } from "@/lib/utils/cn";

type Props = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function FormErrorMsg({ className, children, ...props }: Props) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn("text-sm text-red-500 font-semibold mt-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default FormErrorMsg;
