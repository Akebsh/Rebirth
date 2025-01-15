<script lang="ts">
    import {
    disableFunctions,
    selectCard,
    moveHandCardToDeckTop,
    moveHandCardToDeckBottom,
    moveEntryCardToDeckTop,
    moveEntryCardToDeckBottom,
    moveWaitingCardToDeckTop, // 웨이팅존에서 덱 맨 위로 이동 함수 추가
    moveWaitingCardToDeckBottom,
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
    if (action === "덱 맨 위로") {
      if (card.zone === "hand") {
        moveHandCardToDeckTop(card);
        disableFunctions.set(true);
      } else if (card.zone === "entry") {
        moveEntryCardToDeckTop(card);
        disableFunctions.set(true);
      } else if (card.zone === "waiting") {
        moveWaitingCardToDeckTop(card); // 웨이팅존에서 덱 맨 위로 이동
        disableFunctions.set(true);
      }
    } else if (action === "덱 맨 아래로") {
      if (card.zone === "hand") {
        moveHandCardToDeckBottom(card);
        disableFunctions.set(true);
      } else if (card.zone === "entry") {
        moveEntryCardToDeckBottom(card);
        disableFunctions.set(true);
      } else if (card.zone === "waiting") {
        moveWaitingCardToDeckBottom(card); // 웨이팅존에서 덱 맨 아래로 이동
        disableFunctions.set(true);
      }
    }
    show_action = false;
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

</style>

<!-- body -->
<div class="card" on:click={isClicked} aria-hidden="true">
    <div>
        {#if card.is_flipped}
            <img src="" alt="back" />
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
