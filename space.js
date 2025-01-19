import configs from './index.js';

const [config] = configs;

export default [
	{
		...config,
		rules: {
			...config.rules,
			'react/jsx-indent-props': ['error', 2],
			'react/jsx-indent': ['error', 2],
		},
	},
];
