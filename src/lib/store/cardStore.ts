import { writable } from "svelte/store";

interface Card {
  serial_number: string;
  name: string;
  description: string;
  image_url: string;
  atk: number;
  hp: number;
  position: number;
  is_flipped: boolean;
}

export const deck_store = writable<Card[]>([
  {
    serial_number: "CP-0003",
    name: "프로모",
    description: "のびしろ",
    image_url:
      "https://s3-ap-northeast-1.amazonaws.com/rebirth-fy.com/wordpress/wp-content/images/cardlist/PR/cp_0003.png",
    atk: 3,
    hp: 3,
    position: 0,
    is_flipped: false,
  },
  {
    serial_number: "CP-0003",
    name: "프로모",
    description: "のびしろ",
    image_url:
      "https://s3-ap-northeast-1.amazonaws.com/rebirth-fy.com/wordpress/wp-content/images/cardlist/PR/cp_0003.png",
    atk: 3,
    hp: 3,
    position: 0,
    is_flipped: false,
  },
  {
    serial_number: "CP-0003",
    name: "프로모",
    description: "のびしろ",
    image_url:
      "https://s3-ap-northeast-1.amazonaws.com/rebirth-fy.com/wordpress/wp-content/images/cardlist/PR/cp_0003.png",
    atk: 3,
    hp: 3,
    position: 0,
    is_flipped: false,
  },
]);
export const hand_store = writable<Card[]>([]);
export const entry_store = writable<Card[]>([]);

export function drawCard() {
  let current_deck: Card[] = [];
  let current_hand: Card[] = [];

  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  hand_store.update((hand) => {
    current_hand = [...hand];
    return hand;
  });

  if (current_deck.length > 0) {
    const drawn_card = current_deck.pop();
    if (drawn_card) {
      hand_store.set([...current_hand, drawn_card]);
    }
    deck_store.set(current_deck);
    console.log("뽑은 카드: ", drawn_card?.name);
    return drawn_card;
  } else {
    console.log("덱이 비었습니다.");
    return null;
  }
}

export function moveToEntryZone(cardToMove: Card) {
  let current_hand: Card[] = [];
  let current_entry: Card[] = [];

  hand_store.update((hand) => {
    current_hand = [...hand];
    return hand;
  });
  entry_store.update((entry) => {
    current_entry = [...entry];
    return entry;
  });

  if (current_entry.length > 0) {
    console.log("이미 엔트리에 카드가 있습니다.");
    return;
  }

  const selected_card = current_hand.findIndex(
    (card) => card.serial_number === cardToMove.serial_number
  );

  if (selected_card !== -1) {
    const [moved_card] = current_hand.splice(selected_card, 1);
    entry_store.set([...current_entry, moved_card]);
    hand_store.set(current_hand);
    console.log("핸드에서 엔트리로 이동: ", moved_card.name);
  } else {
    console.log("해당하는 카드가 없습니다.");
  }
}
