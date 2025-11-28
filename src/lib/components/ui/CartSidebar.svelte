<script>
    import { cart, cartTotal, cartActions, isAuthOpen, user, authMode } from '$lib/store';
    import { theme } from '$lib/theme';
    import { fly } from 'svelte/transition';
    export let isOpen = false;
    export let onClose;

    function handleCheckout() {
        if (!$user) {
            alert("Connectez-vous pour commander.");
            $authMode = 'login';
            $isAuthOpen = true;
            return;
        }
        cartActions.checkout();
        alert("Commande validée !");
        onClose();
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 z-[60] flex justify-end">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" on:click={onClose}></div>
        <div class="relative w-full max-w-md h-full bg-white dark:bg-slate-900 p-6 shadow-2xl flex flex-col" transition:fly={{ x: 300 }}>
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Mon Panier</h2>
                <button on:click={onClose}>✕</button>
            </div>

            <div class="flex-1 overflow-y-auto space-y-4">
                {#each $cart as item (item.id)}
                    <div class="flex gap-4 items-center bg-gray-50 dark:bg-slate-800 p-3 rounded-xl">
                        <img src={item.image} alt="" class="w-16 h-16 rounded-lg object-cover" />
                        <div class="flex-1">
                            <h4 class="font-bold text-sm">{item.name}</h4>
                            <p class="text-sm opacity-70">{item.price}€</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button on:click={() => cartActions.updateQty(item.id, -1)}>-</button>
                            <span class="font-mono">{item.qty}</span>
                            <button on:click={() => cartActions.updateQty(item.id, 1)}>+</button>
                        </div>
                        <button on:click={() => cartActions.remove(item.id)} class="text-red-500">🗑</button>
                    </div>
                {/each}
            </div>

            <div class="border-t pt-6 mt-4">
                <div class="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span style="color: {theme().primary}">{$cartTotal}€</span>
                </div>
                <button 
                    on:click={handleCheckout}
                    disabled={$cart.length === 0}
                    class="w-full py-4 rounded-xl font-bold text-white disabled:opacity-50"
                    style="background-color: {theme().primary}"
                >
                    Commander
                </button>
            </div>
        </div>
    </div>
{/if}