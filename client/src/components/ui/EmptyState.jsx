import Button from "./Button";
import "./ui.css";

export default function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
  icon = "○",
}) {
  return (
    <div className="ui-empty-state">
      <div className="ui-empty-state__icon">{icon}</div>
      <h3 className="ui-empty-state__title">{title}</h3>
      <p className="ui-empty-state__message">{message}</p>
      {actionLabel && onAction ? (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
