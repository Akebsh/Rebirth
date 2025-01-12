<script>
    import Deck from "$lib/components/Deck.svelte";
    import EntryZone from "$lib/components/EntryZone.svelte";
    import HandZone from "$lib/components/HandZone.svelte";
    import WaitingZone from "$lib/components/WaitingZone.svelte";

    import { deck_store, hand_store, entry_store, waiting_store } from "$lib/store/cardStore";
</script>

<!-- body -->

<EntryZone entry_list={$entry_store}></EntryZone>
<hr>
<HandZone hand_list={$hand_store}></HandZone>
<hr>
<Deck deck_list={$deck_store}></Deck>
<hr>
<WaitingZone waiting_list={$waiting_store}></WaitingZone>

