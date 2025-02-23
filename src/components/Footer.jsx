function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Mark McFadden. All Rights Reserved.
        </p>
        <p>
          <a href="mailto:mcfadden.a.mark@gmail.com">
            mcfadden.a.mark@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
