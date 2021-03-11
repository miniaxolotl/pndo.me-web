import { createBreakpoints } from '@chakra-ui/theme-tools';
import { ThemeConfig, ThemeOverride, extendTheme } from '@chakra-ui/react';

const fonts = { 
	body: 'Quicksand',
	heading: 'Capriola',
	mono: 'Oxygen Mono'
};

const breakpoints = createBreakpoints({
	sm: '40em',
	md: '52em',
	lg: '64em',
	xl: '80em'
});

const config: ThemeConfig & ThemeOverride = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
	colors: {
		black: '#16161D'
	},
	fonts,
	breakpoints
};

const theme = extendTheme({ config });

export default theme;
