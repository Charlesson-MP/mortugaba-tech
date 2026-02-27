import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "text" | "textSmall";

type BaseButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
};

type LinkButtonProps = BaseButtonProps & {
  href: string;
};

type ActionButtonProps = BaseButtonProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = LinkButtonProps | ActionButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-lg bg-[#166534] text-[#F3F4F6] transition-colors hover:bg-[#15803d]",
  outline:
    "rounded-lg border border-[#C2A56B] text-[#C2A56B] transition-colors hover:bg-[#C2A56B] hover:text-[#0F172A]",
  text: "text-[#C2A56B] transition-colors hover:text-[#d4b87d]",
  textSmall: "text-sm text-[#C2A56B] transition-colors hover:text-[#d4b87d]",
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const classes = joinClasses(variantClasses[variant], props.className);

  if ("href" in props) {
    return (
      <a className={classes} href={props.href} onClick={props.onClick}>
        {props.children}
      </a>
    );
  }

  return (
    <button className={classes} type={props.type ?? "button"} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
