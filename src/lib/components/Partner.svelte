<script lang="ts">
  import Card from "./Card.svelte";
  import { pickCard, partner_store, hand_store, waiting_store } from "$lib/store/cardStore";
  import { get } from "svelte/store";
  import type { Card as CardType } from "$lib/store/cardStore";
  import { disableFunctions } from "$lib/store/cardStore";

  export let partner_list: CardType[]; // PartnerZone 카드 리스트

  function handleClick() {
    console.log("disableFunctions 상태:", get(disableFunctions));
    if (get(disableFunctions)) {
      return;
    }

    console.log("PartnerZone 클릭됨"); // 클릭 이벤트 확인
    const selectedCard = get(pickCard); // 선택된 카드 가져오기

    if (selectedCard) {
      console.log("선택된 카드:", selectedCard); // 선택된 카드 정보 출력

      const alreadyInPartner = get(partner_store).some(
        (card) => card.serial_number === selectedCard.serial_number
      );
      if (alreadyInPartner) {
        console.log("이미 파트너존에 있습니다.");
        pickCard.set(null);
        return;
      }

      // 카드 이동
      selectedCard.zone = "partner";
      disableFunctions.set(true);

      console.log("disableFunctions 상태:", get(disableFunctions));
      partner_store.update((partner) => [...partner, { ...selectedCard }]); // 여러 장의 카드를 추가 가능하게 수정
      hand_store.update((hand) =>
        hand.filter((card) => card.serial_number !== selectedCard.serial_number)
      );
      waiting_store.update((waiting) =>
        waiting.filter((card) => card.serial_number !== selectedCard.serial_number)
      );

      // 선택 상태 초기화
      pickCard.set(null);

      console.log("카드가 파트너로 이동:", selectedCard.name);
    } else {
      console.log("선택된 카드가 없습니다.");
    }
  }
</script>

<style>
  .partner-zone {
    display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 카드 간 여백을 20px로 늘림 */
  padding: 20px; /* 존 전체의 여백을 추가 */
  border: 2px solid #000;
  background-color: #f9f9f9;
  overflow-x: auto; /* 여러 장의 카드를 배치하기 위한 스크롤 활성화 */
  }

  .card-container {
    position: relative;
  }
</style>

<div class="zone-title">PartnerZone</div>
<div class="partner-zone" on:click={handleClick}>
  {#each partner_list as card}
    <div class="card-container">
      <Card {card} /> <!-- card 객체 통째로 전달 -->
    </div>
  {/each}
</div>
