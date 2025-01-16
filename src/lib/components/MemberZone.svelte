<script lang="ts">
    import Card from "./Card.svelte";
    import { get } from "svelte/store";
    import { pickCard, member_store_1, member_store_2, member_store_3, hand_store, waiting_store } from "$lib/store/cardStore";
  
    export const member_lists = [
      { id: "1", store: member_store_1 },
      { id: "2", store: member_store_2 },
      { id: "3", store: member_store_3 },
    ];
  
    function handleClick(event: MouseEvent) {
      const selectedCard = get(pickCard);
  
      if (!selectedCard) {
        console.log("선택된 카드가 없습니다.");
        return;
      }
  
      const zoneId = (event.currentTarget as HTMLElement).dataset.id;
  
      // 스토어 직접 참조
      let targetStore;
      if (zoneId === "1") targetStore = member_store_1;
      else if (zoneId === "2") targetStore = member_store_2;
      else if (zoneId === "3") targetStore = member_store_3;
  
      if (!targetStore) {
        console.log("잘못된 MemberZone ID입니다.");
        return;
      }
  
      const alreadyInZone = get(targetStore).some(
        (card) => card.serial_number === selectedCard.serial_number
      );
  
      if (alreadyInZone) {
        console.log("이미 선택된 MemberZone에 카드가 있습니다.");
        pickCard.set(null);
        return;
      }
  
      // 카드 이동
      if (zoneId === "1") {
  selectedCard.zone = "member-1";
} else if (zoneId === "2") {
  selectedCard.zone = "member-2";
} else if (zoneId === "3") {
  selectedCard.zone = "member-3";
}
      targetStore.update((store) => [...store, { ...selectedCard }]);
  
      // 핸드와 웨이팅존에서 카드 제거
      hand_store.update((hand) =>
        hand.filter((card) => card.serial_number !== selectedCard.serial_number)
      );
      waiting_store.update((waiting) =>
        waiting.filter((card) => card.serial_number !== selectedCard.serial_number)
      );
  
      pickCard.set(null);
      console.log(`카드가 MemberZone ${zoneId}로 이동:`, selectedCard.name);
    }
  </script>
  
  <style>
    .member-zones-container {
      display: flex;
      flex-direction: row;
      gap: 20px;
      justify-content: center;
      align-items: flex-start;
      padding: 10px;
    }
  
    .member-zone {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border: 2px solid #000;
      background-color: #e3f2fd;
      overflow-x: auto;
      width: 131px;
      height: 181px;
    }
  
    .card-container {
      position: relative;
    }
  </style>
  
  <div class="zone-title">Member Zones</div>
  <div class="member-zones-container">
    <div class="member-zone" data-id="1" on:click={handleClick}>
      {#each $member_store_1 as card}
        <div class="card-container">
          <Card {card} />
        </div>
      {/each}
    </div>
  
    <div class="member-zone" data-id="2" on:click={handleClick}>
      {#each $member_store_2 as card}
        <div class="card-container">
          <Card {card} />
        </div>
      {/each}
    </div>
  
    <div class="member-zone" data-id="3" on:click={handleClick}>
      {#each $member_store_3 as card}
        <div class="card-container">
          <Card {card} />
        </div>
      {/each}
    </div>
  </div>
  