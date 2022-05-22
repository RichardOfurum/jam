import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './RecipeCard.module.css';

export default function RecipeCard({recipe}) {

    const {title, slug, cookingTime, thumbnail} =recipe.fields;

  return (
    <div className={styles.card}>

        <div className={styles.foeatured}>
            <Image 
                className={styles.cardImage}
                src={'https:' + thumbnail.fields.file.url}
                width={400}
                height={300}
                priority
            /> 
        </div>

        <div className={styles.content}>
            <div className={styles.info}>
                <h4>{title}</h4>
                <p>Takes approx {cookingTime} mins tomake</p>
            </div>
            <div className={styles.actions}>
                <Link href={'/recipes/' + slug}><a>Cook this </a></Link>
            </div>
        </div>

        

    </div>
  )
}
