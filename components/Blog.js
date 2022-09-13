import Link from "next/link"

export function Blog(props) {
	return (
		<div className={styles.blog}>
			<Link>
				<div className={styles.imgContainer}>
					<img src={props.coverPhoto.url} alt='cover photo' />
				</div>
			</Link>
		</div>
	)
}