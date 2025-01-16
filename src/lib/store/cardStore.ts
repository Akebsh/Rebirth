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

// 엔트리존 이동
export function moveToEntryZone(cardToMove: Card) {
  if (get(disableFunctions)) {
    return;
  }

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
  if (get(disableFunctions)) {
    return;
  }

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
    console.log("핸드에서 덱 맨 위로 이동:", moved_card.name);
  } else {
    console.log("핸드에 해당 카드가 없습니다.");
  }
}

// 핸드 덱 맨 아래
export function moveHandCardToDeckBottom(cardToMove: Card) {
  if (get(disableFunctions)) {
    return;
  }

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
  if (get(disableFunctions)) {
    return;
  }

  let current_entry: Card[] = [];
  let current_deck: Card[] = [];

  entry_store.update((entry) => {
    current_entry = [...entry];
    return entry;
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
    console.log("엔트리존에서 덱 맨 위로 이동:", moved_card.name);
  } else {
    console.log("엔트리존에 해당 카드가 없습니다.");
  }
}
// 엔트리존의 카드를 덱 맨 아래로 이동
export function moveEntryCardToDeckBottom(cardToMove: Card) {
  if (get(disableFunctions)) {
    return;
  }

  let current_entry: Card[] = [];
  let current_deck: Card[] = [];

  entry_store.update((entry) => {
    current_entry = [...entry];
    return entry;
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

export function moveWaitingCardToDeckTop(cardToMove: Card) {
  if (get(disableFunctions)) {
    return;
  }

  let current_waiting: Card[] = [];
  let current_deck: Card[] = [];

  // 현재 웨이팅존과 덱의 상태 가져오기
  waiting_store.update((waiting) => {
    current_waiting = [...waiting];
    return waiting;
  });
  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  // 웨이팅존에서 이동할 카드 찾기
  const selected_card_index = current_waiting.findIndex(
    (card) => card.serial_number === cardToMove.serial_number
  );

  if (selected_card_index !== -1) {
    // 카드 이동 처리
    const [moved_card] = current_waiting.splice(selected_card_index, 1);
    moved_card.zone = "deck"; // zone 변경
    deck_store.set([...current_deck, moved_card]); // 덱 맨 아래로 추가
    waiting_store.set(current_waiting); // 웨이팅존에서 제거

    console.log("웨이팅존에서 덱 맨 위로 이동:", moved_card.name);
  } else {
    console.log("웨이팅존에 해당 카드가 없습니다.");
  }
}

export function moveWaitingCardToDeckBottom(cardToMove: Card) {
  if (get(disableFunctions)) {
    return;
  }

  let current_waiting: Card[] = [];
  let current_deck: Card[] = [];

  // 현재 웨이팅존과 덱의 상태 가져오기
  waiting_store.update((waiting) => {
    current_waiting = [...waiting];
    return waiting;
  });
  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  // 웨이팅존에서 이동할 카드 찾기
  const selected_card_index = current_waiting.findIndex(
    (card) => card.serial_number === cardToMove.serial_number
  );

  if (selected_card_index !== -1) {
    // 카드 이동 처리
    const [moved_card] = current_waiting.splice(selected_card_index, 1);
    moved_card.zone = "deck"; // zone 변경
    deck_store.set([...current_deck, moved_card]); // 덱 맨 아래로 추가
    waiting_store.set(current_waiting); // 웨이팅존에서 제거

    console.log("웨이팅존에서 덱 맨 아래로 이동:", moved_card.name);
  } else {
    console.log("웨이팅존에 해당 카드가 없습니다.");
  }
}

export function moveToMemberZone(cardToMove: Card, zoneId: "1" | "2" | "3") {
  if (get(disableFunctions)) {
    return;
  }

  let targetStore;
  if (zoneId === "1") {
    targetStore = member_store_1;
  } else if (zoneId === "2") {
    targetStore = member_store_2;
  } else if (zoneId === "3") {
    targetStore = member_store_3;
  }

  if (!targetStore) {
    console.log("잘못된 멤버존 ID:", zoneId);
    return;
  }

  const alreadyInZone = get(targetStore).some(
    (card) => card.serial_number === cardToMove.serial_number
  );
  if (alreadyInZone) {
    console.log(`카드가 이미 MemberZone ${zoneId}에 있습니다.`);
    return;
  }

  targetStore.update((store) => [...store, { ...cardToMove }]); // 멤버존에 카드 추가

  // 기존 위치에서 제거
  hand_store.update((hand) =>
    hand.filter((card) => card.serial_number !== cardToMove.serial_number)
  );
  waiting_store.update((waiting) =>
    waiting.filter((card) => card.serial_number !== cardToMove.serial_number)
  );

  cardToMove.zone = `member-${zoneId}`; // zone 업데이트
  console.log(`카드가 MemberZone ${zoneId}으로 이동:`, cardToMove.name);
}

// 멤버를 덱 맨 위로 이동
export function moveMemberToDeckTop(
  memberToMove: Card,
  memberStore:
    | typeof member_store_1
    | typeof member_store_2
    | typeof member_store_3
) {
  if (get(disableFunctions)) {
    return;
  }

  let current_members: Card[] = [];
  let current_deck: Card[] = [];

  memberStore.update((members) => {
    current_members = [...members];
    return members;
  });

  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  const selected_member_index = current_members.findIndex(
    (member) => member.serial_number === memberToMove.serial_number
  );

  if (selected_member_index !== -1) {
    const [moved_member] = current_members.splice(selected_member_index, 1);
    moved_member.zone = "deck"; // zone 변경
    deck_store.set([moved_member, ...current_deck]); // 덱 맨 위로 이동
    memberStore.set(current_members);
    console.log("멤버를 덱 맨 위로 이동:", moved_member.name);
  } else {
    console.log("멤버 리스트에 해당 멤버가 없습니다.");
  }
}

// 멤버를 덱 맨 아래로 이동
export function moveMemberToDeckBottom(
  memberToMove: Card,
  memberStore:
    | typeof member_store_1
    | typeof member_store_2
    | typeof member_store_3
) {
  if (get(disableFunctions)) {
    return;
  }

  let current_members: Card[] = [];
  let current_deck: Card[] = [];

  memberStore.update((members) => {
    current_members = [...members];
    return members;
  });

  deck_store.update((deck) => {
    current_deck = [...deck];
    return deck;
  });

  const selected_member_index = current_members.findIndex(
    (member) => member.serial_number === memberToMove.serial_number
  );

  if (selected_member_index !== -1) {
    const [moved_member] = current_members.splice(selected_member_index, 1);
    moved_member.zone = "deck"; // zone 변경
    deck_store.set([...current_deck, moved_member]); // 덱 맨 아래로 이동
    memberStore.set(current_members);
    console.log("멤버를 덱 맨 아래로 이동:", moved_member.name);
  } else {
    console.log("멤버 리스트에 해당 멤버가 없습니다.");
  }
}
