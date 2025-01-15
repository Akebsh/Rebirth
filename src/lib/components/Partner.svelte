<script lang="ts">
    import Card from "./Card.svelte";
    import type { Card as CardType } from "$lib/store/cardStore";
  
    export let partner_list: Array<CardType>; // PartnerZone 카드 리스트
  </script>
  
  <style>
    .partner-zone {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border: 2px solid green; /* PartnerZone을 구분하기 위한 색상 */
      background-color: #eaffea; /* PartnerZone 전용 배경색 */
      overflow-x: auto;
    }
  
    .card-container {
      position: relative;
    }
  </style>
  
  <div class="zone-title">PartnerZone</div>
  <div class="partner-zone">
    {#each partner_list as card}
      <div class="card-container">
        <Card {card} /> <!-- card 객체를 통째로 전달 -->
      </div>
    {/each}
  </div>
  