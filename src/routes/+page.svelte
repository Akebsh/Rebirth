<script>
    import Deck from "$lib/components/Deck.svelte";
    import Energy from "$lib/components/Energy.svelte";
    import EntryZone from "$lib/components/EntryZone.svelte";
    import HandZone from "$lib/components/HandZone.svelte";
    import Partner from "$lib/components/Partner.svelte";
    import RevealZone from "$lib/components/RevealZone.svelte";
    import WaitingZone from "$lib/components/WaitingZone.svelte";
    import MemberZone from "$lib/components/MemberZone.svelte";
    import RebirthZone from "$lib/components/RebirthZone.svelte";
    import RetireZone from "$lib/components/RetireZone.svelte";
  
    import {
      deck_store,
      hand_store,
      entry_store,
      reveal_store,
      waiting_store,
      energy_store,
      partner_store,
      member_store_1,
      member_store_2,
      member_store_3,
      rebirth_store,
      retire_store
    } from "$lib/store/cardStore";
  </script>
  
  <style>
    .layout-container {
      display: flex;
      gap: 10px; /* 좌측과 우측 레이아웃 간의 간격 */
    }
  
    .left-zone {
      flex: 0 0 200px; /* 좌측 리타이어 존의 너비 고정 */
      display: flex;
      flex-direction: column;
      gap: 10px; /* 리타이어 존 내부 간격 */
    }
  
    .right-zone {
      flex: 1; /* 우측 레이아웃이 남은 공간을 차지 */
      display: flex;
      flex-direction: column;
      gap: 5px; /* 각 존 사이 간격 */
    }
  </style>
  
  <div class="layout-container">
    <!-- 좌측: 리타이어 존 -->
    <div class="left-zone">
      <RetireZone retire_list={$retire_store}></RetireZone>
    </div>
  
    <!-- 우측: 나머지 존 -->
    <div class="right-zone">
      <div style="display: flex; gap: 10px;">
        <RebirthZone rebirth_list={$rebirth_store}></RebirthZone>
        <RevealZone reveal_list={$reveal_store}></RevealZone>
      </div>
      <hr />
      <div style="display: flex; gap: 120px;">
        <EntryZone entry_list={$entry_store}></EntryZone>
        <Deck deck_list={$deck_store}></Deck>
      </div>
      <hr />
      <div style="display: flex; gap: 10px;">
        <MemberZone
          member_lists={[
            { id: "1", store: member_store_1 },
            { id: "2", store: member_store_2 },
            { id: "3", store: member_store_3 },
          ]}
        />
        <WaitingZone waiting_list={$waiting_store}></WaitingZone>
      </div>
      <hr />
      <div style="display: flex; gap: 50px;">
        <Energy energy_list={$energy_store}></Energy>
        <Partner partner_list={$partner_store}></Partner>
      </div>
      <hr />
      <HandZone hand_list={$hand_store}></HandZone>
    </div>
  </div>