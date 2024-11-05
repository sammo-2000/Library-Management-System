import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>This is test API for payment for the library system.</li>
          <li>To to more info & how to use please visit the GitHub</li>
        </ol>
      </main>
    </div>
  );
}
