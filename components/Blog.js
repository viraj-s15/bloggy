import Link from "next/link"
import styles from "../styles/Blog.module.css"

export function Blog(props) {
	return (
		<div className={styles.blog}>
			<Link href={`/posts/${props.slug}`}>
				<div className={styles.imgContainer}>
					<img src={props.coverPhoto.url} alt='cover photo' />
				</div>
			</Link>
			<div className={styles.text}>
				<h2>{props.title}</h2>
				<div className={styles.details}>
					<div className={styles.author}>
						<img src={props.author.authorPhoto.url} alt='author photo' />
						<h3>{props.author.name}</h3>
					</div>
					<div className={styles.date}>
						<h3>{props.datePublished}</h3>
					</div>
				</div>
			</div>
		</div>
	)
}
