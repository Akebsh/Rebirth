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
      rebirth_store
    } from "$lib/store/cardStore";

  </script>
  
  <!-- body -->
  <RevealZone reveal_list={$reveal_store}></RevealZone>
  <hr>
  <RebirthZone rebirth_list={$rebirth_store}></RebirthZone>
  <hr>
  <div style="display: flex; gap: 180px;">
    <EntryZone entry_list={$entry_store}></EntryZone>
    <Deck deck_list={$deck_store}></Deck>
  </div>
  <hr>
  <div style="display: flex; gap: 30px;">
    <MemberZone
      member_lists={[
        { id: "1", store: member_store_1 },
        { id: "2", store: member_store_2 },
        { id: "3", store: member_store_3 },
      ]}
    />
    <WaitingZone waiting_list={$waiting_store}></WaitingZone>
  </div>
  <hr>
  <div style="display: flex; gap: 250px;">
    <Energy energy_list={$energy_store}></Energy>
    <Partner partner_list={$partner_store}></Partner>
  </div>
  <hr>
  <HandZone hand_list={$hand_store}></HandZone>

  