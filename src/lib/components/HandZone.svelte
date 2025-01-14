<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "$lib/store/cardStore";

  export let hand_list: Array<CardType>;
</script>

<style>
  .hand-zone {
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

<div class="zone-title">HandZone</div>
<div class="hand-zone">
  {#each hand_list as card}
      <div class="card-container">
          <Card {card} /> <!-- card 객체를 통째로 전달 -->
      </div>
  {/each}
</div>