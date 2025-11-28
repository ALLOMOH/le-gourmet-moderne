<script>
    import { menu, cartActions } from '$lib/store';
    import { theme } from '$lib/theme';
</script>

<section class="py-24 px-4 bg-gray-50 dark:bg-slate-950" id="menu">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each $menu as item (item.id)}
            <div class="relative group rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex flex-col h-full hover:shadow-2xl transition-all">
                <div class="relative h-64">
                    <img src={item.image} alt={item.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button 
                        on:click={() => cartActions.add(item)}
                        class="absolute top-4 right-4 p-3 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                        +
                    </button>
                </div>
                <div class="p-8 flex-1 flex flex-col">
                    <div class="flex justify-between items-baseline mb-2">
                        <h3 class="text-2xl font-bold font-serif">{item.name}</h3>
                        <span class="text-xl font-bold" style="color: {theme().primary}">{item.price}€</span>
                    </div>
                    <p class="opacity-60 mb-6 flex-1">{item.desc}</p>
                </div>
            </div>
        {/each}
    </div>
</section>