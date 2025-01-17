import { writable, get } from "svelte/store";

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
  is_horizontal: boolean;
  zone:
    | "deck"
    | "hand"
    | "entry"
    | "reveal"
    | "waiting"
    | "energy"
    | "partner"
    | `member-${"1" | "2" | "3"}`
    | "rebirth"
    | "retire";
}

export const disableFunctions = writable(true);

export function toggleCardOrientation(card: Card) {
  card.is_horizontal = !card.is_horizontal; // 방향 토글
  console.log(
    `카드 방향이 변경되었습니다: ${card.name}, 가로 상태: ${card.is_horizontal}`
  );
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
    is_horizontal: false,
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
    is_horizontal: false,
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
    is_horizontal: false,
    zone: "deck",
  },
]);
export const hand_store = writable<Card[]>([]);
export const entry_store = writable<Card[]>([]);
export const reveal_store = writable<Card[]>([]);
export const waiting_store = writable<Card[]>([]);
export const energy_store = writable<Card[]>([]);
export const partner_store = writable<Card[]>([]);
export const pickCard = writable<Card | null>(null);
export const member_store_1 = writable<Card[]>([]);
export const member_store_2 = writable<Card[]>([]);
export const member_store_3 = writable<Card[]>([]);
export const rebirth_store = writable<Card[]>([]);
export const retire_store = writable<Card[]>([]);

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
  disableFunctions.set(false);
  console.log("카드 선택됨:", card.name);
}

export function moveTopCardToRevealZone() {
  let current_deck: Card[] = [];
  let current_reveal: Card[] = [];

  // 덱 상태 가져오기
  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  // RevealZone 상태 가져오기
  reveal_store.update((reveal) => {
    current_reveal = [...reveal];
    return reveal;
  });

  if (current_deck.length > 0) {
    const top_card = current_deck.shift(); // 덱의 맨 위 카드 가져오기
    if (top_card) {
      top_card.zone = "reveal"; // zone 변경
      reveal_store.set([...current_reveal, top_card]); // RevealZone에 추가
    }
    deck_store.set(current_deck); // 덱 상태 업데이트
    console.log("덱 맨 위 카드가 RevealZone으로 이동: ", top_card?.name);
    return top_card;
  } else {
    console.log("덱이 비었습니다.");
    return null;
  }
}

export function moveCard(
  cardToMove: Card,
  fromStore:
    | typeof hand_store
    | typeof waiting_store
    | typeof entry_store
    | typeof member_store_1
    | typeof member_store_2
    | typeof member_store_3,
  toStore:
    | typeof deck_store
    | typeof reveal_store
    | typeof entry_store
    | typeof energy_store
    | typeof retire_store
    | typeof partner_store,
  toZone: Card["zone"],
  insertAtTop: boolean = true
) {
  if (get(disableFunctions)) {
    return;
  }

  let currentFromStore: Card[] = [];
  let currentToStore: Card[] = [];

  // 현재 상태 가져오기
  fromStore.update((store) => {
    currentFromStore = [...store];
    return store;
  });

  toStore.update((store) => {
    currentToStore = [...store];
    return store;
  });

  // 이동할 카드 찾기
  const selectedCardIndex = currentFromStore.findIndex(
    (card) => card.serial_number === cardToMove.serial_number
  );

  if (selectedCardIndex !== -1) {
    // 카드 이동 처리
    const [movedCard] = currentFromStore.splice(selectedCardIndex, 1);
    movedCard.zone = toZone; // zone 변경

    // 삽입 위치에 따라 추가
    if (insertAtTop) {
      currentToStore.unshift(movedCard); // 맨 위에 추가
    } else {
      currentToStore.push(movedCard); // 맨 아래에 추가
    }

    // 상태 업데이트
    fromStore.set(currentFromStore);
    toStore.set(currentToStore);

    console.log(`카드 이동 완료: ${cardToMove.name}, ${toZone}`);
  } else {
    console.log("이동하려는 카드가 존재하지 않습니다.");
  }
}
