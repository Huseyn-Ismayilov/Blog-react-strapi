import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import ArticleCart from '../components/ArticleCart/ArticleCart';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import useFetch from '../hooks/useFetch';

export default function Category(props) {
   const { slug } = useParams()

   const { isLoading, error, data, setUrl } = useFetch();

   useEffect(() => {
      // const apiUrl = `http://localhost:1337/api/blogs?filters[$and][0][categories][Slug][$eq]=${slug}&populate=author.photo,categories,image`
      setUrl(`http://localhost:1337/api/blogs?filters[$and][0][categories][Slug][$eq]=${slug}&populate=author.photo,categories,image`);
      // console.log(apiUrl);
   }, [slug, setUrl]);
   if (isLoading) return;
   if (error) return;

   const capitalizeText = str => str.charAt(0).toUpperCase() + str.slice(1);
   console.log(data);
   // console.log(slug);

   return (
      <>
         <section className="category_list section_container">
            <div className="container">
               <SectionTitle h1={capitalizeText(slug)} />
               <ul className="blogs_grid4">
                  {data.data.map((blog, index) => (
                     <li
                        key={index}
                        className="cart"
                     >
                        <ArticleCart
                           image={`http://localhost:1337${blog.attributes.image.data[0].attributes.formats.medium.url}`}
                           title={blog.attributes.title}
                           link={`/${blog.attributes.Slug}`}
                           desc={blog.attributes.previewText}
                           tags={
                              blog.attributes.categories.data.map((item, key) => (
                                 <li key={key}>
                                    <Link to={`/category/${item.attributes.Slug}`}>
                                       {item.attributes.Title}
                                    </Link>
                                 </li>
                              ))
                           }
                           authorImage={`http://localhost:1337${blog.attributes.author.data.attributes.photo.data.attributes.formats.small.url}`}
                           authorUsername={blog.attributes.author.data.attributes.fullname}
                           authorNickname={blog.attributes.author.data.attributes.nickname}
                        />
                     </li>
                  ))}
               </ul>
            </div>
         </section>
      </>
   )
}