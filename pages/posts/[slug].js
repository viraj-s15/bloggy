import styles from "../../styles/Slug.module.css"
import Head from "next/head"
import { GraphQLClient, gql } from "graphql-request"

const graphcms = new GraphQLClient(
	`https://api-ap-south-1.hygraph.com/v2/${process.env.API_KEY}/master`
)

const QUERY = gql`
	query Post($slug: String!) {
		post(where: { slug: $slug }) {
			id
			title
			publishedDate
			slug
			content {
				html
			}
			coverPhoto {
				id
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
const SLUGLIST = gql`
	{
		posts {
			slug
		}
	}
`

export async function getStaticPaths() {
	const { posts } = await graphcms.request(SLUGLIST)
	return {
		paths: posts.map((post) => ({ params: { slug: post.slug } })),
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const slug = params.slug
	const data = await graphcms.request(QUERY, { slug })
	const post = data.post
	return {
		props: {
			post
		}
	}
}

export default function Article({ post }) {
	return (
		<>
			<Head>
				<title>Bloggy | {post.title} </title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<main className={styles.blog}>
				<div className={styles.title}>
					<img
						src={post.coverPhoto.url}
						className={styles.cover}
						alt='cover photo'
					/>
				</div>
				<h1>{post.title}</h1>
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: post.content.html }}
				></div>
				<div className={styles.authtext}>
					<h6>By {post.author.name}</h6>
					<h6 className={styles.date}>{post.publishedDate}</h6>
				</div>
			</main>
		</>
	)
}
