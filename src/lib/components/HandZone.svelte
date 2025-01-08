<script lang="ts">
    import Card from "./Card.svelte";

    export let hand_list: Array<any>;
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
            <Card
                serial_number={card.serial_number}
                name={card.name}
                description={card.description}
                image_url={card.image_url}
                atk={card.atk}
                hp={card.hp}
                position={card.position}
                is_flipped={false}
            />
        </div>
    {/each}
</div>