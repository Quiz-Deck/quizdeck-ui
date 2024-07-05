import { SingleDeck } from 'features/api/deck/deckSliceTypes';
import localForage from 'localforage';
// /**
//  * Active version of each store in local forage
//  */
//  const localForageStoreVersions: { [key: string]: number } = {
// 	DECKS: 1,
// 	QUESTIONS: 1,
// 	USERS: 1
// };

localForage.config({
	driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE],
	name: 'Quiryfy'
});


export const deckStore = localForage.createInstance({
	name: 'Quiryfy',
	storeName: 'Decks'
});


export const questionStore = localForage.createInstance({
	name: 'Quiryfy',
	storeName: 'Questions'
});

export const userStore = localForage.createInstance({
	name: 'Quiryfy',
	storeName: 'Users'
});


/**
 * Function to save a deck to IndexedDB
 * @param deck Deck to Save to IndexedDB
 */
 export const saveDeckInLocalForage = async (
	deck: SingleDeck,
) => {
	if (deck && deck._id) {
		await deckStore.setItem(deck._id as string, deck)
		.catch(function(err) {
			if (err.name === 'QuotaExceededError') {
				console.log('Storage limit exceeded. Please clear some space.');
			} else {
				console.error(err);
			}
		});
		return true;
	}
	return false;
};

/**
 * Function to load a project from indexedDB
 * @param deckId Id of the Project to load
 */
 export const loadDeckFromLocalForage = async (deckId: string) => {
	try {
		const deck = await deckStore.getItem(deckId) as SingleDeck;

		return deck;
	} catch (error) {
		console.error('Error accessing Project ', error);
		return false;
	}
};


/**
 * Function to get decks by type
 * @param type this can either be "PUBLIC" or "PRIVATE"
 */
 export const getDecks = async (
	type?: 'PUBLIC' | 'PRIVATE'
) => {
	const decks: SingleDeck[] = [];
	await deckStore.iterate((value, key) => {
		const deck = value as SingleDeck;
		if (type) {
			if (deck.type === type) {
				decks.push(deck);
			}
		}else{
			decks.push(deck)
		}
	});
	return decks;
};