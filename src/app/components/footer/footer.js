import styles from './footer.module.css';

export default function Footer() {
    return (
      <footer className={styles.footerCont}>
        <div className={styles.footer}>
          <div>&copy; {new Date().getFullYear()} Our Company Name</div>
        </div>
      </footer>
    );
  }