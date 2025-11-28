<script>
    import { theme } from '$lib/theme';
    let y = 0;

    function scrollTo(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
</script>

<svelte:window bind:scrollY={y} />

<section class="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
    <!-- Fond Parallaxe -->
    <div 
        class="absolute inset-0 z-0 bg-cover bg-center"
        style="
            background-image: url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80');
            transform: scale(1.1) translateY({y * 0.4}px);
            filter: brightness(0.5);
        "
    ></div>
    
    <!-- Contenu -->
    <div class="relative z-10 text-center px-4 max-w-5xl space-y-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
             <!-- Icone ChefHat simplifiée -->
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" x2="18" y1="17" y2="17"/></svg>
             Cuisine d'Exception
        </div>
        
        <h1 class="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl font-serif">
          L'Art du <span class="italic" style="color: {theme().primary}">Goût</span>
        </h1>
        
        <div class="flex justify-center gap-4">
            <button 
                on:click={() => scrollTo('reservation')}
                class="px-10 py-4 rounded-full text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform"
                style="background-color: {theme().primary}"
            >
                Réserver
            </button>
        </div>
    </div>
</section>