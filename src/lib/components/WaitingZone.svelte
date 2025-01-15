<script lang="ts">
  import Card from "./Card.svelte";
  import { pickCard, waiting_store, hand_store, reveal_store } from "$lib/store/cardStore";
  import { get } from "svelte/store";
  import type { Card as CardType } from "$lib/store/cardStore";
  import { disableFunctions } from "$lib/store/cardStore";

    export let waiting_list: CardType[]; // WaitingZone 카드 리스트
  
    let isHolding = false; // 꾹 누름 상태
    let holdTimeout: any; // 꾹 누름 타이머
    let showCardList = false; // 카드 목록 표시 여부

  // 웨이팅존 클릭 핸들러
     function handleClick() {
      if (get(disableFunctions)) {
    return;
  }

      console.log("WaitingZone 클릭됨"); // 클릭 이벤트 확인
      const selectedCard = get(pickCard); // 선택된 카드 가져오기
  
      if (selectedCard) {
        console.log("선택된 카드:", selectedCard); // 선택된 카드 정보 출력
        waiting_store.update((waiting) =>
        waiting.filter((card) => card.serial_number !== selectedCard.serial_number)
      );

      
  // RevealZone에서 제거
      reveal_store.update((reveal) => 
      reveal.filter((card) => card.serial_number !== selectedCard.serial_number)
    );

    const alreadyInWaiting = get(waiting_store).some(
  (card) => card.serial_number === selectedCard.serial_number
);
if (alreadyInWaiting) {
  console.log("이미 웨이팅존에 있습니다.");
  pickCard.set(null);
  return;
}

       // 카드 이동
    selectedCard.zone = "waiting";
    waiting_store.update((waiting) => {
      const updated = [...waiting, { ...selectedCard }];
      return updated;
    });

    hand_store.update((hand) =>
      hand.filter((card) => card.serial_number !== selectedCard.serial_number)
    );
  
        // 선택 상태 초기화
        pickCard.set(null);
        console.log("WaitingZone으로 카드 이동 완료:", selectedCard.name);
      } else {
        console.log("선택된 카드가 없습니다.");
      }
    }

   // 카드 선택 핸들러
  function selectCardForEntry(card: CardType) {
      pickCard.set(card); // 선택된 카드를 pickCard 상태에 저장
     }


  // 꾹 누름 시작
  function handleMouseDown() {
    isHolding = true;
    holdTimeout = setTimeout(() => {
      if (isHolding) {
        showCardList = true; // 카드 목록 표시
        console.log("카드 목록 표시");
      }
    }, 1000); // 1초 동안 꾹 누를 경우 실행
  }

  // 꾹 누름 종료
  function handleMouseUp() {
    isHolding = false;
    if (holdTimeout) clearTimeout(holdTimeout); // 타이머 초기화
  }

  // 카드 목록 닫기
  function closeCardList() {
    showCardList = false;
    console.log("카드 목록 숨김");
  }

  </script>
  
  <style>
   .waiting-zone {
      position: relative;
      width: 130px;
      height: 190px;
      border: 2px solid #000;
      background-color: #f9f9f9;
      overflow: hidden; /* 카드가 쌓이는 효과 */
      cursor: pointer;
  }

  .card-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translate(0, calc(5px * var(--index, 0))); /* 카드가 쌓이는 효과 */
      z-index: var(--index, 0); /* 카드 순서 */
      pointer-events: none;
  }

  .card-list-overlay {
      position: fixed; /* 화면에 고정 */
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%; /* 화면의 80% 너비 */
      height: 80%; /* 화면의 80% 높이 */
      background-color: rgba(0, 0, 0, 0.9); /* 반투명 배경 */
      color: white;
      border: 2px solid #fff;
      border-radius: 10px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 20px;
      z-index: 1000;
      overflow-y: auto;
  }

  .card-list-overlay .card-item {
      margin: 10px;
      cursor: pointer;
  }

  .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 10px;
      background-color: #ff6b6b;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      z-index: 1010;
  }

  .close-button:hover {
      background-color: #ff4b4b;
  }
  </style>
  
  <div class="zone-title">WaitingZone</div>
  <div 
    class="waiting-zone" 
    on:click={handleClick}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:mouseleave={handleMouseUp}
  >
   {#if showCardList}
    <div class="card-list-overlay">
      <button class="close-button" on:click={closeCardList}>Close</button>
      {#each waiting_list as card}
        <div class="card-item" on:click={() => selectCardForEntry(card)}>
          <Card {card} />
        </div>
      {/each}
    </div>
  {/if}

    {#each waiting_list as card, index}
      <div class="card-container" style="--index: {index}">
        <Card {card} /> 
      </div>
    {/each}
  </div>
  
 