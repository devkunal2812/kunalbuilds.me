import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from './Gallery.module.css'
import { GALLERY_DATA } from '../data/aboutSections'

function GalleryItem({ image, caption, delay }) {
  return (
    <motion.div
      className={styles.galleryItem}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <div className={styles.galleryImage}>
        <div className={styles.galleryPlaceholder}>📷</div>
      </div>
      <p className={styles.galleryCaption}>{caption}</p>
    </motion.div>
  )
}

export default function Gallery() {
  return (
    <div className={styles.page}>
      <div className={styles.backRow}>
        <Link to="/about" className={styles.backLink}>← Back to About</Link>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>Photos & Moments</span>
          <h1 className={styles.title}>Gallery</h1>
          <p className={styles.subtitle}>
            Capturing memories from events, projects, and experiences
          </p>
        </motion.div>

        <div className={styles.gallery}>
          {GALLERY_DATA.map((item, index) => (
            <GalleryItem
              key={index}
              image={item.image}
              caption={item.caption}
              delay={0.05 * index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
