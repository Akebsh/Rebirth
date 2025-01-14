<script lang="ts">
    import { drawCard, entry_store } from "$lib/store/cardStore";
    import { get } from "svelte/store";

    export let deck_list: Array<any>;

    let longPressTimer: number | null = null; // NodeJS.Timeout 대신 number 사용
    let isLongPress = false;

    function handleMouseDown(event: MouseEvent) {
    console.log("Mouse down detected");
    isLongPress = false; // 초기화
    longPressTimer = window.setTimeout(() => {
      console.log("Long press detected - Moving card to Entry Zone");
      moveTopCardToEntryZone(); // 길게 눌렀을 때 실행
      isLongPress = true; // 길게 누름 여부 표시
    }, 1000); // 1초 이상 눌렀을 때 실행
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

  // 덱 맨 위의 카드를 엔트리존으로 이동
  function moveTopCardToEntryZone() {
    if (deck_list.length === 0) {
      console.log("Deck is empty. Cannot move card to Entry Zone.");
      return;
    }

    const card = deck_list[0]; // 덱에서 맨 위의 카드 가져오기
    console.log(`Moving card "${card.name}" to Entry Zone`);

    // 엔트리존에 카드 추가
    entry_store.update((entry) => {
      if (entry.length > 0) {
        console.log("Entry Zone already has a card. Cannot add another card.");
        return entry;
      }

      return [...entry, card];
    });

    // 덱에서 카드 제거 후 Svelte가 변화를 감지하도록 새로운 배열로 대입
    deck_list = deck_list.slice(1);
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

</style>

<div class="zone-title">Deck</div>
 <div class="deck" 
on:mousedown={handleMouseDown}
on:mouseup={handleMouseUp}
on:mouseleave={handleMouseUp}
on:click={handleClick} 
aria-hidden="true"
>
 <div class="deck-counter">{deck_list.length}</div>
</div>

