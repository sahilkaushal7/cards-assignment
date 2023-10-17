// Types
export type Card = { firstname: string, lastname: string, cardNumber: string, cvv: string, expDate: string };

// Constants
const STORAGE_KEY = 'cards-assignment-cards';
const MOCK_CARDS: Card[] = [
    {
        firstname: 'Sahil',
        lastname: 'Kaushal',
        cardNumber: '1234345656782345',
        cvv: '123',
        expDate: '03/28'
    },
    {
        firstname: 'Sahil',
        lastname: 'Kaushal',
        cardNumber: '1231231231233323',
        cvv: '123',
        expDate: '10/26'
    },
    {
        firstname: 'Sahil',
        lastname: 'Kaushal',
        cardNumber: '2312312344122334',
        cvv: '123',
        expDate: '12/30'
    }
]

// Utils methods
const getCardsFromLocalStorage = () => {
    const locallyStoredCards = localStorage.getItem(STORAGE_KEY) || "[]";
    const cards = JSON.parse(locallyStoredCards);
    return cards;
}

const setCardsInLocalStorage = (cards: Card[]) => {
    const locallyStoredCards = localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
}

// Mock APIs
const getCards = (): Promise<{ data: Card[]; }> => new Promise<{ data: Card[] }>((resolve) => {
    const cards = getCardsFromLocalStorage();
    if (cards.length) {
        resolve({ data: cards })
    } else {
        setCardsInLocalStorage(MOCK_CARDS);
        resolve({ data: MOCK_CARDS })
    }
});

const addCard = (card: Card): Promise<{ data: Card[]; }> => new Promise<{ data: Card[] }>((resolve) => {
    const cards = getCardsFromLocalStorage();
    cards.push(card);
    setCardsInLocalStorage(cards);
    resolve({ data: cards })
});

const deleteCard = (index: number): Promise<{ data: Card[]; }> => new Promise<{ data: Card[] }>((resolve) => {
    const cards = getCardsFromLocalStorage();
    const updatedCards = cards.filter((__: Card, i: number) => i !== index);
    setCardsInLocalStorage(updatedCards);
    resolve({
        data: updatedCards
    })
});

export {
    getCards,
    addCard,
    deleteCard
}
