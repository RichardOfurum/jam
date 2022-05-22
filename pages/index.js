import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps(){
    const client = createClient({
        space:process.env.CONTENTFUL_SPACE_ID,
        accessToken:process.env.CONTENTFUL_ACCESS_KEY,
    });

    const res = await client.getEntries({content_type:'recipe'});

    return {
        props:{
          recipes: res.items
        },
        
    }
}

export default function Recipes({recipes}) {
  console.log(recipes);
  return (
    <div className="recipes">
      Recipe List
      <div className="recipe-list">
        {
          recipes.map(recipe =>(
              <RecipeCard key={recipe.sys.id} recipe={recipe}>
                  
              </RecipeCard>
          ))
        }
      </div>

        <style jsx>{
                `   .recipes{
                        width: 100vw  auto;
                    }
                
                    .recipe-list{
                        // width: 80%;
                        display: flex;
                        flex-wrap: wrap;
                        align-items:center;
                        justify-content:center;
                        background-color:#cec1368c;
                        border-radius: 5px;
                    }
                `
            }
        </style>
    </div>
  )
}