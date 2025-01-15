<script>
    import Deck from "$lib/components/Deck.svelte";
    import Energy from "$lib/components/Energy.svelte";
    import EntryZone from "$lib/components/EntryZone.svelte";
    import HandZone from "$lib/components/HandZone.svelte";
    import Partner from "$lib/components/Partner.svelte";
    import RevealZone from "$lib/components/RevealZone.svelte";
    import WaitingZone from "$lib/components/WaitingZone.svelte";

    import { deck_store, hand_store, entry_store, reveal_store, waiting_store, energy_store, partner_store } from "$lib/store/cardStore";
</script>

<!-- body -->

<EntryZone entry_list={$entry_store}></EntryZone>
<hr>
<HandZone hand_list={$hand_store}></HandZone>
<hr>
<Deck deck_list={$deck_store}></Deck>
<hr>
<RevealZone reveal_list={$reveal_store}></RevealZone>
<hr>
<WaitingZone waiting_list={$waiting_store}></WaitingZone>
<hr>
<Energy energy_list={$energy_store}></Energy>
<hr>
<Partner partner_list={$partner_store}></Partner>


