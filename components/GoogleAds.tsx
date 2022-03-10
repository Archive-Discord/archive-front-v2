import AdSense from 'react-adsense'

const Advertisement: React.FC<AdvertisementProps> = ({ size = 'short' }) => {
	return <div className='py-5 px-2'>
		<div
			className={`z-0 mx-auto w-full text-center text-white ${
				process.env.NODE_ENV === 'production' ? '' : 'py-12 bg-black'
			}`}
			style={size === 'short' ? { height: '90px' } : { height: '330px' }}
		>
			{process.env.NODE_ENV === 'production' ? (
				<AdSense.Google
					style={{ display: 'inline-block', width: '100%', height: size === 'short' ? '90px' : '330px'}}
					client='ca-pub-2701426579223876'
					slot='7698754986'
					format=''
				/>
			) : (
				'Ads'
			)}
		</div>
	</div>
}

const VerticalAdvertisement: React.FC<AdvertisementProps> = ({ size = 'short' }) => {
	return <div className='py-5 px-2'>
		<div
			className={`z-0 mx-auto h-full text-center text-white ${
				process.env.NODE_ENV === 'production' ? '' : 'py-12 bg-black'
			}`}
			style={size === 'short' ? { width: '300px' } : { width: '500px' }}
		>
			{process.env.NODE_ENV === 'production' ? (
				<AdSense.Google
					style={{ display: 'inline-block', width: size === 'short' ? '90px' : '330px', height: '100%'}}
					client='ca-pub-2701426579223876'
					slot='7698754986'
					format=''
				/>
			) : (
				'Ads'
			)}
		</div>
	</div>
}

declare global {
	interface Window {
		adsbygoogle: {
			loaded?: boolean
			push(obj: unknown): void
		}
	}
}

interface AdvertisementProps {
	size?: 'short' | 'tall'
}

export default Advertisement
export { VerticalAdvertisement }