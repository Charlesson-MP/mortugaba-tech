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
    "rounded-lg bg-brand-primary text-text-primary transition-colors hover:bg-brand-primary-hover",
  outline:
    "rounded-lg border border-brand-accent text-brand-accent transition-colors hover:bg-brand-accent hover:text-surface-base",
  text: "text-brand-accent transition-colors hover:text-brand-accent-hover",
  textSmall: "text-sm text-brand-accent transition-colors hover:text-brand-accent-hover",
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
