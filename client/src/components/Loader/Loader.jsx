import Button from "../ui/Button";
import "./Loader.css";

export function Spinner({ text = "Loading..." }) {
  return (
    <div className="loader-spinner">
      <div className="loader-spinner__ring" />
      <span className="loader-spinner__text">{text}</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="loader-page">
      <div className="loader-page__content">
        <div className="loader-page__hero skeleton-line skeleton-line--hero" />
        <div className="loader-page__grid">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__img" />
      <div className="skeleton-card__body">
        <div className="skeleton-line skeleton-line--sm" />
        <div className="skeleton-line skeleton-line--lg" />
        <div className="skeleton-line skeleton-line--md" />
        <div className="skeleton-line skeleton-line--full" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function ErrorState({ message = "Something went wrong", onRetry }) {
  return (
    <div className="loader-error">
      <div className="loader-error__icon">!</div>
      <div className="loader-error__title">We could not load this section</div>
      <div className="loader-error__msg">{message}</div>
      {onRetry && (
        <Button className="loader-error__btn" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

export default Spinner;
