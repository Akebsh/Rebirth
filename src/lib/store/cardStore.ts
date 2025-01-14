import { writable } from "svelte/store";

export const cardKeys = {
  serial_number: "serial_number",
  name: "name",
  description: "description",
  image_url: "image_url",
  atk: "atk",
  hp: "hp",
  position: "position",
  is_flipped: "is_flipped",
  zone: "zone",
} as const;

export type CardKeys = keyof typeof cardKeys;

export interface Card {
  serial_number: string;
  name: string;
  description: string;
  image_url: string;
  atk: number;
  hp: number;
  position: number;
  is_flipped: boolean;
  zone: "deck" | "hand" | "entry";
}

export const deck_store = writable<Card[]>([
  {
    serial_number: "CP-0001",
    name: "프로모1",
    description: "のびしろ",
    image_url:
      "https://s3-ap-northeast-1.amazonaws.com/rebirth-fy.com/wordpress/wp-content/images/cardlist/BABP/ba_001b_055.png",
    atk: 3,
    hp: 3,
    position: 0,
    is_flipped: false,
    zone: "deck",
  },
  {
    serial_number: "CP-0002",
    name: "프로모2",
    description: "のびしろ",
    image_url:
      "https://s3-ap-northeast-1.amazonaws.com/rebirth-fy.com/wordpress/wp-content/images/cardlist/BABP/ba_001b_012.png",
    atk: 3,
    hp: 3,
    position: 0,
    is_flipped: false,
    zone: "deck",
  },
  {
    serial_number: "CP-0003",
    name: "프로모3",
    description: "のびしろ",
    image_url:
      "https://s3-ap-northeast-1.amazonaws.com/rebirth-fy.com/wordpress/wp-content/images/cardlist/BABP/ba_001b_009.png",
    atk: 3,
    hp: 3,
    position: 0,
    is_flipped: false,
    zone: "deck",
  },
]);
export const hand_store = writable<Card[]>([]);
export const entry_store = writable<Card[]>([]);
export const pickCard = writable<Card | null>(null);

//드로우 함수
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
    const drawn_card = current_deck.shift();
    if (drawn_card) {
      drawn_card.zone = "hand";
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

// 카드 선택 함수
export function selectCard(card: Card) {
  pickCard.set(card); // 선택된 카드를 상태로 저장
  console.log("카드 선택됨:", card.name);
}

// 엔트리존 이동
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

  const selected_card_index = current_hand.findIndex(
    (card) => card.serial_number === cardToMove.serial_number
  );

  if (selected_card_index !== -1) {
    const [moved_card] = current_hand.splice(selected_card_index, 1);
    moved_card.zone = "entry";
    entry_store.set([...current_entry, moved_card]);
    hand_store.set(current_hand);
    console.log("핸드에서 엔트리로 이동:", moved_card.name);
  } else {
    console.log("해당하는 카드가 없습니다.");
  }
}

// 핸드의 카드를 덱 맨 위로 이동
export function moveHandCardToDeckTop(cardToMove: Card) {
  let current_hand: Card[] = [];
  let current_deck: Card[] = [];

  hand_store.update((hand) => {
    current_hand = [...hand];
    return hand;
  });
  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  const selected_card_index = current_hand.findIndex(
    (card) => card.serial_number === cardToMove.serial_number
  );

  if (selected_card_index !== -1) {
    const [moved_card] = current_hand.splice(selected_card_index, 1);
    moved_card.zone = "deck"; // zone 변경
    deck_store.set([moved_card, ...current_deck]);
    hand_store.set(current_hand);
    console.log("핸드에서 덱 맨 위로 이동:", moved_card.name);
  } else {
    console.log("핸드에 해당 카드가 없습니다.");
  }
}

// 핸드 덱 맨 아래
export function moveHandCardToDeckBottom(cardToMove: Card) {
  let current_hand: Card[] = [];
  let current_deck: Card[] = [];

  hand_store.update((hand) => {
    current_hand = [...hand];
    return hand;
  });
  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  const selected_card_index = current_hand.findIndex(
    (card) => card.serial_number === cardToMove.serial_number
  );

  if (selected_card_index !== -1) {
    const [moved_card] = current_hand.splice(selected_card_index, 1);
    moved_card.zone = "deck"; // zone 변경
    deck_store.set([...current_deck, moved_card]);
    hand_store.set(current_hand);
    console.log("핸드에서 덱 맨 아래로 이동:", moved_card.name);
  } else {
    console.log("핸드에 해당 카드가 없습니다.");
  }
}

// 엔트리존의 카드를 덱 맨 위로 이동
export function moveEntryCardToDeckTop(cardToMove: Card) {
  let current_entry: Card[] = [];
  let current_deck: Card[] = [];

  entry_store.update((entry) => {
    current_entry = [...entry];
    return current_entry;
  });
  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  const selected_card_index = current_entry.findIndex(
    (card) => card.serial_number === cardToMove.serial_number
  );

  if (selected_card_index !== -1) {
    const [moved_card] = current_entry.splice(selected_card_index, 1);
    moved_card.zone = "deck"; // zone 변경
    deck_store.set([moved_card, ...current_deck]);
    entry_store.set(current_entry);
    console.log("엔트리존에서 덱 맨 위로 이동:", moved_card.name);
  } else {
    console.log("엔트리존에 해당 카드가 없습니다.");
  }
}
// 엔트리존의 카드를 덱 맨 아래로 이동
export function moveEntryCardToDeckBottom(cardToMove: Card) {
  let current_entry: Card[] = [];
  let current_deck: Card[] = [];

  entry_store.update((entry) => {
    current_entry = [...entry];
    return current_entry;
  });
  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  const selected_card_index = current_entry.findIndex(
    (card) => card.serial_number === cardToMove.serial_number
  );

  if (selected_card_index !== -1) {
    const [moved_card] = current_entry.splice(selected_card_index, 1);
    moved_card.zone = "deck"; // zone 변경
    deck_store.set([...current_deck, moved_card]);
    entry_store.set(current_entry);
    console.log("엔트리존에서 덱 맨 아래로 이동:", moved_card.name);
  } else {
    console.log("엔트리존에 해당 카드가 없습니다.");
  }
}
