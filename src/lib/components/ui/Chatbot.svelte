<script>
// @ts-nocheck

    import { theme } from '$lib/theme';
    import { menu } from '$lib/store';
    import { callGemini } from '$lib/gemini';
    import { fade, fly } from 'svelte/transition';
    import { afterUpdate } from 'svelte';

    let isOpen = false;
    let input = '';
    let isTyping = false;
    let messagesEnd = " ";
    
    let messages = [
        { role: 'model', text: 'Bonjour ! Je suis Léon, votre concierge. Une question sur le menu ?' }
    ];

    async function handleSend() {
        if (!input.trim()) return;
        const userMsg = input;
        input = '';
        messages = [...messages, { role: 'user', text: userMsg }];
        isTyping = true;

        const systemPrompt = `Tu es Léon, concierge du restaurant. Menu JSON: ${JSON.stringify($menu)}. Horaires: 19h-23h. Sois court et serviable.`;
        
        try {
            const response = await callGemini(`Historique: ${messages.map(m=>m.text).join(' | ')}. User: ${userMsg}`, systemPrompt);
            messages = [...messages, { role: 'model', text: response }];
        } catch {
            messages = [...messages, { role: 'model', text: "Désolé, je ne peux pas répondre pour le moment." }];
        }
        isTyping = false;
    }


</script>

<div class="fixed bottom-6 left-6 z-50">
    {#if !isOpen}
        <button 
            on:click={() => isOpen = true} 
            class="p-4 rounded-full text-white shadow-2xl hover:scale-110 transition-transform animate-bounce"
            style="background-color: {theme().primary}"
        >
            <!-- Icone Message -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
    {/if}

    {#if isOpen}
        <div transition:fly={{ y: 20, duration: 300 }} class="bg-white dark:bg-slate-900 w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
            <!-- Header -->
            <div class="p-4 text-white flex justify-between items-center" style="background-color: {theme().primary}">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="font-bold text-sm">Concierge Léon</span>
                </div>
                <button on:click={() => isOpen = false} class="hover:bg-white/20 p-1 rounded">✕</button>
            </div>

            <!-- Chat Area -->
            <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-slate-950">
                {#each messages as msg}
                    <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
                        <div class="max-w-[80%] p-3 rounded-2xl text-sm {msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 shadow-sm rounded-tl-none border dark:border-gray-700 dark:text-white'}">
                            {msg.text}
                        </div>
                    </div>
                {/each}
                {#if isTyping}
                    <div class="text-xs opacity-50 ml-4">Léon écrit...</div>
                {/if}
                <div bind:this={messagesEnd}></div>
            </div>

            <!-- Input -->
            <form on:submit|preventDefault={handleSend} class="p-3 bg-white dark:bg-slate-900 border-t dark:border-gray-800 flex gap-2">
                <input bind:value={input} placeholder="Une question ?" class="flex-1 bg-gray-100 dark:bg-slate-800 rounded-full px-4 py-2 text-sm outline-none dark:text-white" />
                <button type="submit" class="p-2 rounded-full text-white" style="background-color: {theme().primary}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
            </form>
        </div>
    {/if}
</div>