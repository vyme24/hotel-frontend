import "./ui.css";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  as: Component = "button",
  ...props
}) {
  const classes = [
    "ui-button",
    `ui-button--${variant}`,
    `ui-button--${size}`,
    loading ? "is-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes}
      disabled={Component === "button" ? disabled || loading : undefined}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className="ui-button__spinner" aria-hidden="true" />}
      <span>{children}</span>
    </Component>
  );
}
