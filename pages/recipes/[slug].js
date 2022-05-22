import { createClient } from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import styles from './details.module.css';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async() => {
    const res = await client.getEntries({ content_type: 'recipe' });

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    });

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async({params}) => {

  const {items} = await client.getEntries({ 
      content_type: 'recipe',
      'fields.slug': params.slug
  });

  return {
    props:{
      recipe:items[0]
    }
  }

}

export default function RecipeDetails({recipe}) {
  const { featuredImage, title, cookingTime, ingredients, method } = recipe.fields
  console.log(method)
  // console.log(recipe);
    return ( 
      <div>
      <div className={styles.banner}>
        <Image 
          className={styles.featuredImage}
          src={'https:' + featuredImage.fields.file.url}
          width={1200}
          height={400}
        />
        <h2 className={styles.title}>{ title }</h2>
      </div>

      <div className={styles.info}>
        <p>Takes about { cookingTime } mins to cook.</p>
        <h3>Ingredients:</h3>

        {ingredients.map(ing => (
          <span key={ing}>{ ing }</span>
        ))}
      </div>
        
      <div className={styles.methodContainer}>
        <h3 className={styles.method}>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

    </div>
    )
}