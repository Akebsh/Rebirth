<script lang="ts">
  import {
    moveCard, 
    hand_store, 
    entry_store, 
    waiting_store, 
    deck_store,
    disableFunctions,
    selectCard,
    member_store_1, // 추가
    member_store_2, // 추가
    member_store_3, // 추가
    reveal_store, 
    energy_store, 
    partner_store, 
    rebirth_store, 
    retire_store,
  } from "$lib/store/cardStore";
  import type { Card } from "$lib/store/cardStore";

  export let card: Card;

  let show_action = false;
  let actions = ["덱 맨 위로", "덱 맨 아래로"];

  function isClicked(event: MouseEvent) {
    selectCard(card); // 카드 객체를 그대로 전달
    show_action = true;
  }

  function hideAction(action: string) {
  const zoneToStoreMap: Record<Card["zone"], typeof hand_store | typeof entry_store | typeof waiting_store | typeof member_store_1 | typeof deck_store | typeof reveal_store | typeof energy_store | typeof partner_store | typeof retire_store> = {
    hand: hand_store,
    entry: entry_store,
    waiting: waiting_store,
    "member-1": member_store_1,
    "member-2": member_store_2,
    "member-3": member_store_3,
    deck: deck_store,
    reveal: reveal_store,
    energy: energy_store,
    partner: partner_store,
    rebirth: rebirth_store,
    retire: retire_store,
  };

  const fromStore = zoneToStoreMap[card.zone]; // 현재 카드의 존에 해당하는 스토어
  const insertAtTop = action === "덱 맨 위로"; // 삽입 위치 결정

  if (fromStore) {
    moveCard(card, fromStore, deck_store, "deck", insertAtTop);
    disableFunctions.set(true);
    show_action = false;
  } else {
    console.log(`존 ${card.zone}에 해당하는 스토어가 없습니다.`);
  }
}


</script>

<style>
    .card {
        width: 126px;
        height: 176px;
        border: 2px solid #42d86f;
        border-radius: 9px;
        perspective: 1000px;
        cursor: pointer;
        transition: transform 0.3s ease;
        overflow: hidden;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .action-menu {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        width: 100px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border: 2px solid #000;
        padding: 5px;
    }

    .action-menu-btn {
        display: block;
        margin: 2.5px 0;
        padding: 8px 12px;
        width: 100%;
        background-color: #427cd8;
        border: none;
        color: white;
        font-size: 10px;
        cursor: pointer;
    }

    .action-menu-btn:hover {
        background-color: #1837d4;
    }

    .horizontal {
    transform: rotate(90deg); /* 가로 방향으로 회전 */
    transform-origin: center;
  }

</style>

<!-- body -->
<div class="card {card.is_horizontal ? 'horizontal' : ''}" on:click={isClicked} aria-hidden="true">
  <div>
      {#if card.is_flipped}
          <img src="https://i.namu.wiki/i/dVqH44OcSp6ShiHSmSZsP1DGgi5iUOWNr0YL6H0_gU-pJBiwAQ_NMzQzh7dUXZLWk45e0pPhf5n-l4KAjg1JsA.webp" alt="" />
      {:else}
          <img src={card.image_url} alt={card.serial_number} />
      {/if}
  </div>
</div>

{#if show_action}
  <div class="action-menu">
      {#each actions as action}
          <button class="action-menu-btn" on:click={() => hideAction(action)}>{action}</button>
      {/each}
  </div>
{/if}