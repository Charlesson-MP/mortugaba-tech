import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "text" | "textSmall" | "rounded";

type BaseButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
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
    "rounded-lg border text-text-primary border-text-primary/15 hover:border-text-primary/60",
  text: "text-brand-accent transition-colors hover:text-brand-accent-hover",
  textSmall: "text-sm text-brand-accent transition-colors hover:text-brand-accent-hover",
  rounded:
    "rounded-full bg-brand-primary text-text-primary transition-colors hover:bg-brand-primary-hover",
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";

  const disabledClasses = props.disabled
    ? "pointer-events-none opacity-50"
    : undefined;

  const classes = joinClasses(variantClasses[variant], disabledClasses, props.className);

  // LINK
  if ("href" in props) {
    return (
      <a
        className={classes}
        href={props.href}
        aria-disabled={props.disabled ? true : undefined}
        onClick={(e) => {
          if (props.disabled) {
            e.preventDefault();
            return;
          }
          props.onClick?.(e);
        }}
      >
        {props.children}
      </a>
    );
  }

  // BUTTON
  return (
    <button
      className={classes}
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}