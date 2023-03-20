import logoSvg from '../../public/images/logo.svg';
import React from 'react'
import styles from './ScreenLoader.module.scss';
import Image from 'next/image';

export const ScreenLoader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <Image
          layout='fill'
          src={logoSvg} 
          alt="Hello app logo"
        />
      </div>
    </div>
  )
}
