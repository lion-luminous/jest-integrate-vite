import { PropsWithChildren } from 'react'
import { ConfigProvider } from 'antd'

const AntdProvider = ({ children }: PropsWithChildren) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					fontSize: 16
				},
				components: {
					Input: {
						controlHeight: 40
					},
					Button: {
						controlHeight: 40
					}
				}
			}}
		>
			{children}
		</ConfigProvider>
	)
}

export default AntdProvider
