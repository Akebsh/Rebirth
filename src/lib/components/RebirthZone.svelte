<script lang="ts">
    import Card from "./Card.svelte";
    import { pickCard, rebirth_store, hand_store, waiting_store } from "$lib/store/cardStore";
    import { get } from "svelte/store";
    import type { Card as CardType } from "$lib/store/cardStore"; // Card 타입 가져오기
    import { disableFunctions } from "$lib/store/cardStore";
  
    export let rebirth_list: CardType[]; // RebirthZone 카드 리스트
  
    function handleClick() {
      console.log("disableFunctions 상태:", get(disableFunctions));
      if (get(disableFunctions)) {
        return;
      }
  
      console.log("RebirthZone 클릭됨"); // 클릭 이벤트 확인
      const selectedCard = get(pickCard); // 선택된 카드 가져오기
  
      if (selectedCard) {
        console.log("선택된 카드:", selectedCard); // 선택된 카드 정보 출력
  
        const alreadyInRebirth = get(rebirth_store).some(
          (card) => card.serial_number === selectedCard.serial_number
        );
        if (alreadyInRebirth) {
          console.log("이미 리버스 존에 있습니다.");
          pickCard.set(null);
          return;
        }
        // 카드 이동
        selectedCard.zone = "rebirth";
        selectedCard.is_horizontal = true;
        disableFunctions.set(true);
  
        console.log("disableFunctions 상태:", get(disableFunctions));
        rebirth_store.update((rebirth) => [...rebirth, { ...selectedCard }]); // 새로운 참조로 추가
        hand_store.update((hand) =>
          hand.filter((card) => card.serial_number !== selectedCard.serial_number)
        );
        waiting_store.update((waiting) =>
          waiting.filter((card) => card.serial_number !== selectedCard.serial_number)
        );
  
        // 선택 상태 초기화
        pickCard.set(null);
  
        console.log("카드가 리버스로 이동:", selectedCard.name);
      } else {
        console.log("선택된 카드가 없습니다.");
      }
    }
  </script>
  
  <style>
    .rebirth-zone {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border: 2px solid #000;
      background-color: #f1f1f1;
      overflow-x: auto; /* 가로 스크롤 활성화 */
      width: 100%;
      height: 131px; /* 카드가 가로로 배치되므로 높이를 낮게 설정 */
    }
  
    .card-container {
      position: relative;
    }
  </style>
  
  <div class="zone-title">RebirthZone</div>
  <div class="rebirth-zone" on:click={handleClick}>
    {#each rebirth_list as card}
      <div class="card-container">
        <Card {card} /> <!-- card 객체 통째로 전달 -->
      </div>
    {/each}
  </div>