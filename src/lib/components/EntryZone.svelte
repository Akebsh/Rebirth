<script lang="ts">
    import Card from "./Card.svelte";
    import { pickCard, moveToEntryZone } from "$lib/store/cardStore";
    import { get } from "svelte/store";

    export let entry_list: Array<any>;

        function handleClick() {
    console.log("EntryZone 클릭됨"); // 클릭 이벤트 확인
    const selectedCard = get(pickCard);
    if (selectedCard) {
        console.log("선택된 카드:", selectedCard); // 선택된 카드 정보 확인
        moveToEntryZone(selectedCard);
        pickCard.set(null);
    } else {
        console.log("선택된 카드가 없습니다.");
    }
}

</script>

<style>
    .entry-zone {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border: 2px solid #000;
        background-color: #f9f9f9;
        overflow-x: auto;
        width: 131px;
        height: 181px;
    }

    .card-container {
        position: relative;
    }
</style>

<div class="zone-title">EntryZone</div>
<div class="entry-zone" on:click={handleClick}>
    {#each entry_list as card}
        <div class="card-container">
            <Card
                serial_number={card.serial_number}
                name={card.name}
                description={card.description}
                image_url={card.image_url}
                atk={card.atk}
                hp={card.hp}
                position={card.position}
                is_flipped={false}
                zone="entry" 
            />
        </div>
    {/each}
</div>