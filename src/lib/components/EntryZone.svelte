<script lang="ts">
    import Card from "./Card.svelte";
    import { pickCard, entry_store, hand_store, waiting_store } from "$lib/store/cardStore";
    import { get } from "svelte/store";
    import type { Card as CardType } from "$lib/store/cardStore"; // Card 타입 가져오기
  
    export let entry_list: CardType[]; // EntryZone 카드 리스트
  
    function handleClick() {
     console.log("EntryZone 클릭됨"); // 클릭 이벤트 확인
     const selectedCard = get(pickCard); // 선택된 카드 가져오기

    if (selectedCard) {
    console.log("선택된 카드:", selectedCard); // 선택된 카드 정보 출력
    
    const alreadyInEntry = get(entry_store).some(
      (card) => card.serial_number === selectedCard.serial_number
    );
    if (alreadyInEntry) {
      console.log("이미 엔트리존에 있습니다.");
      return;
    }
    // 카드 이동
    selectedCard.zone = "entry";
    entry_store.update((entry) => [...entry, { ...selectedCard }]); // 새로운 참조로 추가
    hand_store.update((hand) =>
      hand.filter((card) => card.serial_number !== selectedCard.serial_number)
    );
    waiting_store.update((waiting) =>
        waiting.filter((card) => card.serial_number !== selectedCard.serial_number)
      );

    // 선택 상태 초기화
    pickCard.set(null);
    console.log("카드가 엔트리로 이동:", selectedCard.name);
  } else {
    console.log("선택된 카드가 없습니다.");
  }
}

</script>

<style>
    .entry-zone {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border: 2px solid #000;
        background-color: #f9f9f9;
        overflow-x: auto;
        width: 131px;
        height: 181px;
    }

    .card-container {
        position: relative;
    }
</style>

<div class="zone-title">EntryZone</div>
<div class="entry-zone" on:click={handleClick}>
  {#each entry_list as card}
    <div class="card-container">
      <Card {card} /> <!-- card 객체 통째로 전달 -->
    </div>
  {/each}
</div>