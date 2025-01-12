<script lang="ts">
    import { drawCard, popupState, showDeckPopup, hideDeckPopup, deck_store } from "$lib/store/cardStore";
    import { get } from "svelte/store";

    export let deck_list: Array<any>;

    let longPressTimer: number | null = null; // NodeJS.Timeout 대신 number 사용
    let isLongPress = false;
    let showDeckPopupList = false;

    function handleMouseDown(event: MouseEvent) {
        isLongPress = false; // 초기화
        longPressTimer = window.setTimeout(() => {
            console.log("Long press detected - Showing popup");
            showDeckPopup(event.clientX, event.clientY); // 팝업 표시
            isLongPress = true; // 길게 눌렀음을 표시
        }, 1000); // 1초
    }

    function handleMouseUp() {
        console.log("Mouse up detected");
        if (longPressTimer !== null) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    }

     
    function handleClick() {
        if (!isLongPress) {
            console.log("Short click detected - Drawing card");
            drawCard(); // 짧은 클릭일 때만 카드 뽑기
        }
    }
    function closePopup() {
        hideDeckPopup();
    }

    function showDeckList() {
    showDeckPopupList = true; // 덱 목록 팝업 열기
  }

  function closeDeckList() {
    showDeckPopupList = false; // 덱 목록 팝업 닫기
  }

     // Action menu 상태 구독
     $: actionMenu = $popupState; 

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
        position: relative;
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

  
    .action-menu {
        position: absolute;
        background-color: #fff;
        border: 1px solid #000;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 120px;
        z-index: 9999;
        position: fixed;
    }

    .action-menu-btn {
        margin: 5px 0;
        padding: 10px;
        width: 100%;
        background-color: #427cd8;
        color: white;
        border: none;
        cursor: pointer;
        text-align: center;
    }

    .action-menu-btn:hover {
        background-color: #1837d4;
    }

    .deck-popup {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    width: 300px;
    max-height: 400px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    z-index: 10000;
    padding: 20px;
  }

  .deck-popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .deck-popup-header button {
    background-color: #f00;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  .deck-popup-header button:hover {
    background-color: #c00;
  }

  .deck-popup ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .deck-popup li {
    margin: 5px 0;
    padding: 5px;
    border-bottom: 1px solid #ddd;
  }
</style>


<div class="zone-title">Deck</div>
<div class="deck" 
on:mousedown={handleMouseDown}
on:mouseup={handleMouseUp}
on:mouseleave={handleMouseUp}
on:click={handleClick} aria-hidden="true">
    <div class="deck-counter">{deck_list.length}</div>
</div>

<!-- Action Menu -->
{#if actionMenu.showPopup}
    <div
        class="action-menu"
        style="top: {Math.min(actionMenu.position.y, window.innerHeight - 120)}px; 
               left: {Math.min(actionMenu.position.x, window.innerWidth - 120)}px;"
    >
        <button class="action-menu-btn" on:click={closePopup}>닫기</button>
        <button class="action-menu-btn" on:click={showDeckList}>
            덱 목록 보기
          </button>
        <button class="action-menu-btn" on:click={() => console.log('Option 2')}>
            옵션 2
        </button>
    </div>
{/if}

<!-- Deck List Popup -->
{#if showDeckPopupList}
  <div class="deck-popup">
    <div class="deck-popup-header">
      <h3>덱 목록</h3>
      <button on:click={closeDeckList}>닫기</button>
    </div>
    <ul>
      {#each get(deck_store) as card, index}
        <li>{index + 1}. {card.name}</li>
      {/each}
    </ul>
  </div>
{/if}