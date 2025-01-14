<script lang="ts">
    import { drawCard } from "$lib/store/cardStore";
    import { moveTopCardToRevealZone } from "$lib/store/cardStore";

    export let deck_list: Array<any>;

    function handleRightClick(event: MouseEvent) {
    event.preventDefault(); // 기본 우클릭 메뉴 비활성화
    moveTopCardToRevealZone(); // 덱 맨 위 카드를 RevealZone으로 이동
  }

</script>

<style>
    .deck {
        width: 126px;
        height: 176px;
        border: 2px solid #42d86f;
        border-radius: 9px;
        perspective: 1000px;
        cursor: pointer;
        background-color: #4f4fce;
    }

    .deck-counter {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(100%, -50%);
        background-color: #fff;
        width: 40px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border: 2px solid #000;
    }

</style>

<div class="zone-title">Deck</div>
<div
    class="deck"
    on:click={drawCard} 
    on:contextmenu={handleRightClick} 
    aria-hidden="true"
>
    <div class="deck-counter">{deck_list.length}</div>
</div>