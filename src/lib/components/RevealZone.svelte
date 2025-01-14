<script lang="ts">
    import Card from "./Card.svelte";
    import type { Card as CardType } from "$lib/store/cardStore"; // Card 타입 가져오기

    export let reveal_list: CardType[] = []; // RevealZone 카드 리스트 초기화
  
   
  </script>
  
  <style>
    .reveal-zone {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border: 2px solid #000;
      background-color: #f9f9f9;
      overflow-x: auto;
  }

  .card-container {
      position: relative;
  }
  
  </style>
  
  <div class="zone-title">RevealZone</div>
  <div class="reveal-zone">
    {#each reveal_list as card}
      <div class="card-container">
        <Card {card} /> <!-- card 객체 통째로 전달 -->
      </div>
    {/each}
  </div>
  