import './ContentBlocks.css';

export function ContentContainer({ children, className = '' }) {
  return (
    <div className={`content-container ${className}`}>
      {children}
    </div>
  );
}

export function ContentGrid({ children, className = '' }) {
  return (
    <div className={`content-grid ${className}`}>
      {children}
    </div>
  );
}

export function ContentBlock({
  children,
  title,
  description,
  className = '',
}) {
  return (
    <article className={`content-block ${className}`}>
      {title && <h3 className="content-block-title">{title}</h3>}

      {description && (
        <p className="content-block-description">{description}</p>
      )}

      {children}
    </article>
  );
}

export function ContentSection({
  children,
  eyebrow,
  title,
  description,
  className = '',
}) {
  return (
    <section className={`content-section ${className}`}>
      <ContentContainer>
        {(eyebrow || title || description) && (
          <header className="content-section-heading">
            {eyebrow && (
              <span className="content-section-eyebrow">{eyebrow}</span>
            )}

            {title && <h2>{title}</h2>}

            {description && <p>{description}</p>}
          </header>
        )}

        {children}
      </ContentContainer>
    </section>
  );
}

export default ContentBlock;
