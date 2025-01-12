<script lang="ts">
    import { selectCard } from "$lib/store/cardStore"; 
    import { moveHandCardToDeckTop, moveHandCardToDeckBottom, moveEntryCardToDeckTop, moveEntryCardToDeckBottom } from "$lib/store/cardStore";
    
    export let serial_number: string;
    export let name: string;
    export let description: string;
    export let image_url: string;
    export let atk: number;
    export let hp: number;
    export let position: number;
    export let is_flipped: boolean = false;
    export let zone: "hand" | "entry"| "waiting";

    let show_action = false;
    let actions = ["덱 맨 위로", "덱 맨 아래로"];


    function isClicked(event: MouseEvent) {
        selectCard({
            serial_number,
            name,
            description,
            image_url,
            atk,
            hp,
            position,
            is_flipped
        }); // 카드 선택
        show_action = true;
    }

    // 행동 실행
    function hideAction(action: string) {
        if (action === "덱 맨 위로") {
            if (zone === "hand") {
                moveHandCardToDeckTop({
                    serial_number,
                    name,
                    description,
                    image_url,
                    atk,
                    hp,
                    position,
                    is_flipped,
                });
            } else if (zone === "entry") {
                moveEntryCardToDeckTop({
                    serial_number,
                    name,
                    description,
                    image_url,
                    atk,
                    hp,
                    position,
                    is_flipped,
                });
            }
        } else if (action === "덱 맨 아래로") {
            if (zone === "hand") {
                moveHandCardToDeckBottom({
                    serial_number,
                    name,
                    description,
                    image_url,
                    atk,
                    hp,
                    position,
                    is_flipped,
                });
            } else if (zone === "entry") {
                moveEntryCardToDeckBottom({
                    serial_number,
                    name,
                    description,
                    image_url,
                    atk,
                    hp,
                    position,
                    is_flipped,
                });
            }
        }
        show_action = false;
    }
</script>

<style>
    .card {
        width: 126px;
        height: 176px;
        border: 2px solid #42d86f;
        border-radius: 9px;
        perspective: 1000px;
        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .action-menu {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        width: 100px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border: 2px solid #000;
        padding: 5px;
    }

    .action-menu-btn {
        display: block;
        margin: 2.5px 0;
        padding: 8px 12px;
        width: 100%;
        background-color: #427cd8;
        border: none;
        color: white;
        font-size: 10px;
        cursor: pointer;
    }

    .action-menu-btn:hover {
        background-color: #1837d4;
    }

</style>

<!-- body -->
<div class="card" on:click={isClicked} aria-hidden="true">
    <div>
        {#if is_flipped}
            <img src="" alt="back" />
        {:else}
            <img src={image_url} alt={serial_number} />
        {/if}
    </div>
</div>

{#if show_action}
    <div class="action-menu">
        {#each actions as action}
            <button class="action-menu-btn" on:click={() => hideAction(action)}>{action}</button>
        {/each}
    </div>
{/if}