import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

const Home: NextPageWithLayout = () => {
	return (
		<>
			<h1 className={styles.title}>Home</h1>
			<p className={styles.description}>
				Welcome! Use the menu below to navigate this website
			</p>
		</>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
