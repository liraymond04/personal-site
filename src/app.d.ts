// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Module: any,
		dataLayer: IArguments[],
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		gtag?: (...args: any[]) => void,
	}
}

export {};
