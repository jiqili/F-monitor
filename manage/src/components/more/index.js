import styles from "./more.module.css";
import Link from "next/link";
export default function More({ message, href }) {
    return (
        <div className={styles.moreWrapper}>
            <p>
                {message}
            </p>
            <button className={styles.moreButton}>
                <Link href={href || '/'}>
                    &gt;
                </Link>
            </button>
        </div>
    )
}