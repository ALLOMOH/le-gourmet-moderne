<script>
    import { menu, user, reservations, reviews, orders, isAuthOpen, authMode } from '$lib/store';
    import { theme } from '$lib/theme';
    import { callGemini } from '$lib/gemini';
    import { slide } from 'svelte/transition';

    let isOpen = false;
    let activeTab = 'orders';
    let ingredients = "";
    let isGenerating = false;

    function handleOpen() {
        if (!$user || $user.role !== 'admin') {
            alert("Accès réservé aux administrateurs.");
            $authMode = 'login';
            $isAuthOpen = true;
            return;
        }
        isOpen = !isOpen;
    }

    async function generateDish() {
        if (!ingredients) return;
        isGenerating = true;
        try {
            const res = await callGemini(`Crée un plat JSON (name, category, price, desc) avec : ${ingredients}`, "Chef expert.");
            const clean = res.replace(/```json/g, '').replace(/```/g, '').trim();
            const dish = JSON.parse(clean);
            menu.update(m => [...m, { ...dish, id: Date.now(), image: "[https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80](https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80)" }]);
            ingredients = "";
        } catch(e) { console.error(e); }
        isGenerating = false;
    }
</script>
{#if $user?.role === 'admin' }
<button 
    class="fixed bottom-6 right-6 z-40 px-6 py-4 rounded-full text-white shadow-2xl font-bold"
    style="background-color: {theme().primary}"
    on:click={handleOpen}
>
    Admin Pro
</button>
{/if}

{#if isOpen && $user?.role === 'admin'}
    <div class="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-4">
        <div class="bg-white dark:bg-slate-900 w-full max-w-5xl h-[90vh] rounded-3xl flex flex-col overflow-hidden">
            <div class="p-6 border-b flex justify-between">
                <h2 class="text-xl font-bold">Dashboard Admin</h2>
                <button on:click={() => isOpen = false}>✕</button>
            </div>
            
            <div class="flex border-b">
                {#each ['orders', 'reservations', 'menu'] as tab}
                    <button 
                        class="px-6 py-4 font-bold capitalize {activeTab === tab ? 'text-primary border-b-2 border-primary' : 'opacity-60'}"
                        on:click={() => activeTab = tab}
                    >
                        {tab}
                    </button>
                {/each}
            </div>

            <div class="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-slate-950/50">
                {#if activeTab === 'orders'}
                    {#each $orders as order}
                        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl mb-4 flex justify-between">
                            <div>
                                <span class="font-bold">#{order.id}</span> - {order.user}
                                <p class="text-sm opacity-60">{order.items.length} articles • {order.total}€</p>
                            </div>
                            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">{order.status}</span>
                        </div>
                    {/each}
                {/if}

                {#if activeTab === 'menu'}
                    <div class="mb-8 flex gap-2">
                        <input bind:value={ingredients} placeholder="Ingrédients..." class="flex-1 p-3 rounded-xl border dark:bg-slate-800" />
                        <button on:click={generateDish} disabled={isGenerating} class="px-6 bg-black text-white rounded-xl">
                            {isGenerating ? '...' : 'Générer IA'}
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        {#each $menu as item}
                            <div class="p-3 bg-white dark:bg-slate-800 rounded-lg flex justify-between">
                                <span>{item.name}</span>
                                <button class="text-red-500" on:click={() => menu.update(m => m.filter(i => i.id !== item.id))}>🗑</button>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
