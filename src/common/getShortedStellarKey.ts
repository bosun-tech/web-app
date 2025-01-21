export function getShortedStellarKey(publicKey: string): string {
	return publicKey.slice(0, 4).concat('...').concat(publicKey.substr(-4));
}
