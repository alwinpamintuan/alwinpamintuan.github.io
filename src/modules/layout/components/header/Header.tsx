import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { classes } from '@utils/index';
import styles from './Header.module.css';
import others from '@components/placeholder/Placeholder.module.css';

type Props = {}

export function Header({}: Props) {
  const [openBurger, setOpenBurger] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const animationEls = document.querySelectorAll(`.${others.rotating}, .${others.bobbing}`);
    animationEls?.forEach((el) => {
      el.classList.toggle('noanimation');
    })
  }, [openBurger])

  return (
    <header className={styles.header}>
      <Link href='/'>
        <a className={styles.brand}>
          <span className={styles.alwin}>alwin</span>
          <span className={styles.pamintuan}>pamintuan</span>
        </a>
      </Link>

      <nav className={styles.menu} data-burger={openBurger}>
        <Link href='#about'>
          <a className={styles.link}>About</a>
        </Link>
        
        <Link href='#projects'>
          <a className={styles.link}>Projects</a>
        </Link>

        <Link href='#contact'>
          <a className={styles.link}>Contact</a>
        </Link>
      </nav>
      
      <label className={styles.burgerIcon} data-burger={openBurger}>
        <input type="checkbox" className={styles.checkbox} onChange={(e) => {
          setOpenBurger(e.target.checked);
        }}/>

        <div className={styles.burgerLines}>
          <span className={classes(styles.line, styles.line1)}/>
          <span className={classes(styles.line, styles.line2)}/>
          <span className={classes(styles.line, styles.line3)}/>
        </div>
      </label>

    </header>
  )
}