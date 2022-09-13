import Head from "next/head"
import styles from "../styles/Home.module.css"
import { GraphQLClient, gql } from "graphql-request"
import { Blog } from "../components/Blog"

const graphcms = new GraphQLClient(
	`https://api-ap-south-1.hygraph.com/v2/${process.env.API_KEY}/master`
)

const QUERY = gql`
	{
		posts {
			id
			title
			publishedDate
			slug
			content {
				html
			}
			coverPhoto {
				url
			}
			author {
				name
				authorPhoto {
					url
				}
			}
		}
	}
`
export async function getStaticProps() {
	const { posts } = await graphcms.request(QUERY)
	return {
		props: {
			posts
		}
	}
}

export default function Home({ posts }) {
	return (
		<div className={styles.container}>
			<div className='bg'></div>
			<Head>
				<title>Bloggy</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<div className={styles.pageTitle}>
				<h1>Bloggy</h1>
			</div>
			<main className={styles.main}>
				{posts.map((post) => (
					<Blog
						title={post.title}
						author={post.author}
						coverPhoto={post.coverPhoto}
						key={post.id}
						publishedDate={post.publishedDate}
						slug={post.slug}
					/>
				))}
			</main>
		</div>
	)
}
