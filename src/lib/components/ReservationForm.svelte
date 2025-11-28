<script>
    import { theme } from '$lib/theme';
    import { user, isAuthOpen, authMode, reservations } from '$lib/store';
    import { fade } from 'svelte/transition';

    let form = { name: '', date: '', time: '', guests: 2 };
    let status = ''; // '', 'loading', 'success'

    function handleSubmit() {
        // Vérification Auth
        if (!$user) {
            alert("Veuillez vous connecter pour réserver.");
            $authMode = 'login';
            $isAuthOpen = true;
            return;
        }

        status = 'loading';
        
        // Simulation API
        setTimeout(() => {
            reservations.update(current => [
                ...current, 
                { ...form, id: Date.now(), status: 'En attente', user: $user.name }
            ]);
            status = 'success';
            form = { name: '', date: '', time: '', guests: 2 };
            
            setTimeout(() => status = '', 3000);
        }, 1000);
    }
</script>

<section id="reservation" class="py-24 px-4 relative flex items-center justify-center">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80')] bg-cover bg-fixed brightness-[0.2]"></div>
    
    <div class="relative z-10 w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">
        <!-- Info Panel -->
        <div class="md:w-1/3 p-10 text-white flex flex-col justify-between" style="background-color: {theme().primary}">
            <div>
                <h3 class="text-3xl font-bold mb-6 font-serif">Horaires</h3>
                <p class="opacity-90">Lun-Dim: 19h-23h</p>
            </div>
            <div><p class="text-xl font-bold">+225 07 07 07 07 07</p></div>
        </div>

        <!-- Form Panel -->
        <div class="md:w-2/3 p-10 bg-white dark:bg-slate-900 transition-colors">
            <h2 class="text-3xl font-bold mb-8 font-serif dark:text-white">Réserver</h2>
            
            <form on:submit|preventDefault={handleSubmit} class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="number" bind:value={form.guests} class="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 outline-none border border-transparent focus:border-current dark:text-white" placeholder="Pers." required min="1" />
                <input type="date" bind:value={form.date} class="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 outline-none border border-transparent focus:border-current dark:text-white" required />
                <input type="time" bind:value={form.time} class="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 outline-none border border-transparent focus:border-current dark:text-white" required />
                
                <input 
                    type="text" 
                    value={$user ? $user.name : form.name} 
                    disabled={!!$user} 
                    on:input={(e) => form.name = e.target.value}
                    class="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 outline-none border border-transparent focus:border-current dark:text-white disabled:opacity-70" 
                    placeholder={$user ? "Connecté : " + $user.name : "Nom complet"} 
                    required 
                />
                
                <button 
                    type="submit" 
                    class="md:col-span-2 py-5 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]" 
                    style="background-color: {theme().primary}"
                >
                    {#if status === 'loading'}
                        Traitement...
                    {:else if status === 'success'}
                        Demande envoyée !
                    {:else}
                        Confirmer la table
                    {/if}
                </button>
            </form>
        </div>
    </div>
</section>