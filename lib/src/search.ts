// light weight tree to do searches efficient on small/medium sized lists
export class SearchTree<T> {
	map: {[key: string]: T};
	cache: SearchTreeCache;

	constructor(map: {[key: string]: T}) {
		this.map = map;
		this.cache = [];
	}

	private lookupResults(strs: string[]): T[] {
		return strs.map(str => this.map[str]);
	}

	search(str: string): T[] {
		// check for backspaces, store up to 3 possibilties of backspace
		for (let i = 0; i < 3; i += 1) {
			if (this.cache[i].str == str) { // same value as before
				return this.lookupResults(this.cache[i].results);
			}
		}

		let isOneTyped = true;
		if (str.length - 1 == this.cache[0].str.length) {
			for (let i = 0; i < str.length - 1; i += 1) {
				if (str[i] != this.cache[0].str) {
					isOneTyped = false;
					break;
				}
			}
		}

		if (isOneTyped) {
			// filter with the last cache's strings
			let newOptions = this.filter(this.cache[0].results, str);
			let cacheString: CacheString = { str, results: newOptions };

			// push the other cache out of the way and make this number 1
			this.cache.splice(0, 0, cacheString);
			if (this.cache.length > 3) {
				this.cache.pop();
			}

			return this.lookupResults(newOptions);
		}
		else {
			// filter with all possible keys
			let newOptions = this.filter(Object.keys(this.map), str);
			let cacheString: CacheString = { str, results: newOptions };

			// because its a completly new string, blow away the cache
			this.cache = [cacheString];
			return this.lookupResults(newOptions);
		}

	}

	private filter(list: string[], query: string): string[] {
		let newList = [];
		for (let str in list) {
			let queryIndex = 0;
			for (let i = 0; i < str.length; i += 1) {
				if (query[queryIndex] == str[i]) {
					queryIndex += 1;
				}
				if (queryIndex == query.length) {
					newList.push(str);
					break;
				}
			}
		}

		return newList;
	}

}

interface CacheString {
	str: string,
	results: string[]
}

// holds previous cache results in case of backspace
export type SearchTreeCache = CacheString[];

