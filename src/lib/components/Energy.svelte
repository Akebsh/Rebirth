<script lang="ts">
    import Card from "./Card.svelte";
    import type { Card as CardType } from "$lib/store/cardStore";
  
    export let energy_list: Array<CardType>; // EnergyZone 카드 리스트
  </script>
  
  <style>
    .energy-zone {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border: 2px solid blue; /* EnergyZone을 구분하기 위한 색상 */
      background-color: #eef9ff; /* EnergyZone 전용 배경색 */
      overflow-x: auto;
    }
  
    .card-container {
      position: relative;
    }
  </style>
  
  <div class="zone-title">EnergyZone</div>
  <div class="energy-zone">
    {#each energy_list as card}
      <div class="card-container">
        <Card {card} /> <!-- card 객체를 통째로 전달 -->
      </div>
    {/each}
  </div>
  