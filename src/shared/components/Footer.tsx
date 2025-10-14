import './Footer.scss';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <a href="/privacy" className="footer__link">
          Privacy
        </a>
        <span className="footer__separator">·</span>
        <span className="footer__copyright">
          © {currentYear} Story Render
        </span>
      </div>
    </footer>
  );
};
