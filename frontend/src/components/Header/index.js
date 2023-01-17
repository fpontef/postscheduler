import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={'/'}>
          <Image
            width={150}
            height={22}
            className={styles.headerContent__logo}
            src='/images/logo.png'
            alt='Apoia.se logo'
          />
        </Link>
        <nav>
          <Link href='/campains'>
            <button className={styles.headerContent__campain_button}>
              Minhas Campanhas
            </button>
          </Link>
          <Image
            width={40}
            height={40}
            className={styles.headerContent__user}
            src='/images/generic_userimage.jpg'
            alt='User image'
          />
        </nav>
      </div>
    </header>
  );
}
