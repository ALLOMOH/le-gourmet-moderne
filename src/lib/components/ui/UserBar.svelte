<script>
    import {user ,authActions , isAuthOpen, authMode} from '$lib/store';
    import  {theme}    from '$lib/theme';
</script>

<div class="fixed top-6 right-20 z-30 flex gap-2">
    {#if $user}
        <div class="flex items-center gap-2 bg-white  dark:bg-slate-900 p-1.5 pr-4 rounded-full shadow-xl border border-white/10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold  " style="background-color: {theme().primary}">
                {$user.name.charAt(0)}
            </div>
            <div class="flex flex-col leading-none">
                <span class="text-xs font-bold">{$user.name}</span>
                <span class="text-[10px] opacity-60 uppercase">{$user.role === 'admin' ? 'Admin' : 'Membre'}</span>
            </div>
            <button on:click={authActions.logout} class="ml-2 text-xs hover:text-red-500">Déco.</button>
        </div>
    {:else}
        <button 
            on:click={() => { $authMode = 'login'; $isAuthOpen = true; }}
            class="px-4 py-2 bg-white dark:bg-slate-900 rounded-full shadow-xl text-sm font-bold hover:bg-gray-500/50  active:scale-95 transition duration-400"
        >
            Connexion
        </button>
    {/if}
</div>