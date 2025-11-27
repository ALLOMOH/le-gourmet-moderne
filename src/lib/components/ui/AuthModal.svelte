<script>
    import { isAuthOpen, authMode, authActions, theme } from '$lib/stores';
    import { theme as themeStore } from '$lib/stores';
    import { fade, scale } from 'svelte/transition';

    let formData = { name: '', email: '', password: '' };
    let error = '';

    function handleSubmit() {
        error = '';
        let success = false;
        if ($authMode === 'login') {
            success = authActions.login(formData.email, formData.password);
        } else {
            success = authActions.register(formData.name, formData.email, formData.password);
        }
        if (!success) error = "Identifiants incorrects.";
    }
</script>

{#if $isAuthOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" transition:fade>
        <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl w-full max-w-md relative shadow-2xl" transition:scale>
            <button class="absolute top-4 right-4" on:click={() => $isAuthOpen = false}>✕</button>
            
            <h2 class="text-3xl font-bold mb-2">{$authMode === 'login' ? 'Connexion' : 'Inscription'}</h2>
            
            <form on:submit|preventDefault={handleSubmit} class="space-y-4 mt-6">
                {#if $authMode === 'register'}
                    <input bind:value={formData.name} placeholder="Nom" class="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800" required />
                {/if}
                <input type="email" bind:value={formData.email} placeholder="Email" class="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800" required />
                <input type="password" bind:value={formData.password} placeholder="Mot de passe" class="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800" required />
                
                {#if error} <p class="text-red-500 text-sm">{error}</p> {/if}
                
                <button class="w-full py-4 rounded-xl font-bold text-white" style="background-color: {$themeStore.primaryColor}">
                    {$authMode === 'login' ? 'Se connecter' : "S'inscrire"}
                </button>
            </form>
            
            <div class="mt-4 text-center text-sm opacity-70">
                <button on:click={() => $authMode = $authMode === 'login' ? 'register' : 'login'} class="hover:underline">
                    {$authMode === 'login' ? "Créer un compte" : "J'ai déjà un compte"}
                </button>
            </div>
        </div>
    </div>
{/if}