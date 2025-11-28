<script>
    import { theme } from '$lib/theme';
    import { fly } from 'svelte/transition';
    
    let isOpen = false;

    let isDarkMode = theme().darkMode;
    const colors = [
        { name: 'Orange', val: '#ea580c' },
        { name: 'Vert', val: '#059669' },
        { name: 'Bleu', val: '#2563eb' },
        { name: 'Or', val: '#d97706' },
        { name: 'Violet', val: '#7c3aed' }
    ];

    // Toggle dark mode
    // function toggleMode(toDark) {
    //     // theme.update(t => ({ ...t, darkMode: !t.darkMode })); 
    //     toDark ===!isDarkMode ? theme().darkMode : !theme().darkMode;
    // }
</script>

<div class="fixed top-1/2 right-0 z-40 transform -translate-y-1/2">
    {#if !isOpen}
        <button 
            on:click={() => isOpen = true}
            class="bg-white/80 backdrop-blur-md text-black p-3 rounded-l-xl shadow-lg hover:pl-5 transition-all"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
    {/if}

    {#if isOpen}
        <div 
            transition:fly={{ x: 300, duration: 400 }}
            class="bg-white/95 backdrop-blur-2xl border-l border-white/20 p-6 rounded-l-3xl shadow-2xl w-72 text-slate-900"
        >
            <div class="flex justify-between items-center mb-6">
                <h3 class="font-bold">Design Studio</h3>
                <button on:click={() => isOpen = false}>✕</button>
            </div>

            <div class="space-y-6">
                <!-- Couleurs -->
                <div>
                    <p class="text-xs font-bold mb-3 text-slate-400 uppercase">Couleur</p>
                    <div class="flex gap-2 flex-wrap">
                        {#each colors as c}
                            <button 
                                on:click={() => theme.update(t => ({ ...t, primaryColor: c.val }))}
                                class="w-8 h-8 rounded-full transition-transform hover:scale-110 {theme().primary === c.val ? 'ring-2 ring-slate-900 ring-offset-2' : ''}"
                                style="background-color: {c.val}"
                                title={c.name}
                            />
                        {/each}
                    </div>
                </div>

                <!-- Dark Mode -->
                <div>
                    <p class="text-xs font-bold mb-3 text-slate-400 uppercase">Ambiance</p>
                    <div class="flex bg-slate-100 p-1 rounded-full">
                        <button 
                            
                            class="flex-1 py-2 rounded-full text-xs font-bold transition-all {!theme().darkMode ? 'bg-white shadow text-black' : 'text-gray-500'}"
                        >
                            Clair
                        </button>
                        <button 
                    
                            class="flex-1 py-2 rounded-full text-xs font-bold transition-all {theme().darkMode ? 'bg-slate-800 shadow text-white' : 'text-gray-500'}"
                        >
                            Sombre
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>