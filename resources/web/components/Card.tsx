import React, { useState } from 'react';
import Image from 'next/image';
import theme from './theme';
import {
	Button,
	Card,
	CardContent,
	CardActionArea,
	Typography,
	ThemeProvider
} from '@mui/material';

type CardProps = {
	meta?: {
		title?: string | undefined;
		media?: any;
		description?: any | null;
		keywords?: string;
	};
};

const Home = (props: CardProps) => {
	const {
		meta = {
			title: 'Card title',
			media: undefined,
			description:
				'Highlight a brief description of the card and limit it to 1-2 lines of text'
		}
	} = props;
	const [isHover, setIsHover] = useState(false);

	return (
		<>
			<ThemeProvider theme={theme}>
				<Card
					variant="outlined"
					onPointerOver={() => setIsHover(true)}
					onPointerLeave={() => setIsHover(false)}
					sx={{
						color: 'var(--r-main-color)',
						bgcolor: 'transparent',
						width: '250px',
						height: '250px',
						margin: '2vh 2vh',
						borderRadius: '8px',
						transition: '500ms'
					}}
				>
					<CardActionArea
						sx={{
							width: '100%',
							height: '100%',
							borderRadius: 'inherit'
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								border: `1px solid ${
									isHover
										? 'transparent'
										: 'var(--r-main-color)'
								}`,
								borderRadius: '4px',
								background: isHover
									? 'rgba(0,0,0,.9)'
									: 'var(--r-background-color)',
								transform: 'scale(0.975)',
								zIndex: 1,
								transition: '500ms'
							}}
						>
							<div
								style={{
									height: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									margin: isHover
										? '-35% 0 -35% 0'
										: '-15% 0 -15% 0',
									clipPath: isHover
										? 'inset(35% 0)'
										: 'inset(15% 0)',
									transition: '500ms'
								}}
							>
								{meta?.media ? (
									<>
										{typeof meta?.media === 'string' ? (
											<Image
												alt="card media"
												width={'100%'}
												height={'100%'}
												objectFit="contain"
												src={meta?.media}
											/>
										) : (
											meta?.media
										)}
									</>
								) : (
									<Image
										alt="card media"
										width={'100%'}
										height={'100%'}
										objectFit="contain"
										src={'/logo.svg'}
									/>
								)}
							</div>
							<CardContent>
								<Typography
									variant="h5"
									sx={{
										textAlign: 'center',
										paddingBottom: '24px'
									}}
								>
									{meta?.title}
								</Typography>
								<div
									style={{
										display: 'flex',
										flexFlow: 'row wrap'
									}}
								>
									{meta?.keywords
										?.split(/\,|\.|\s/)
										.map(element => (
											<Button
												variant="outlined"
												sx={{
													pointerEvents: 'none',
													color: 'var(--r-secondary-color)',
													borderColor:
														'var(--r-secondary-color)'
												}}
											>
												{element}
											</Button>
										))}
								</div>

								<Typography
									variant="body2"
									sx={{ opacity: isHover ? 1 : 0 }}
								>
									{meta?.description}
								</Typography>
							</CardContent>
						</div>
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								borderRadius: 'inherit',
								background: isHover
									? 'conic-gradient(cyan, cyan, blue,rgba(0,0,0,0),rgba(0,0,0,0), purple, magenta, orange,orange, cyan)'
									: 'transparent',
								backgroundRepeat: 'no-repeat',
								transform: `scale(${isHover ? 1 : 0.9})`,
								zIndex: 0,
								transition: '500ms'
							}}
						/>
					</CardActionArea>
				</Card>
			</ThemeProvider>
		</>
	);
};

export default Home;
