<script>
    import { theme } from '$lib/theme';

    let year = new Date().getFullYear();
</script>

<footer class="bg-black text-white py-16 px-4 border-t border-white/10">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="space-y-4">
            <h3 class="text-2xl font-bold font-serif">Le Gourmet</h3>
            <p class="opacity-50 text-sm">L'excellence culinaire rencontre l'intelligence artificielle pour une expérience inoubliable en Côte d'Ivoire.</p>
        </div>
        
        <div>
            <h4 class="font-bold mb-4" style="color: {theme().primary}">Contact</h4>
            <ul class="space-y-2 text-sm opacity-70">
                <li>Abidjan, Cocody Riviera</li>
                <li>+225 07 07 07 07 07</li>
                <li>contact@gourmet.ci</li>
            </ul>
        </div>
        
        <div>
            <h4 class="font-bold mb-4" style="color: {theme().primary}">Liens</h4>
            <ul class="space-y-2 text-sm opacity-70">
                <li><a href="#" class="hover:text-white">Mentions Légales</a></li>
                <li><a href="#" class="hover:text-white">Carrières</a></li>
                <li><a href="#" class="hover:text-white">Privatisation</a></li>
            </ul>
        </div>
        
        <div>
            <h4 class="font-bold mb-4" style="color: {theme().primary}">Newsletter</h4>
            <div class="flex">
                <input placeholder="Email" class="bg-white/10 p-2 rounded-l-lg outline-none text-sm w-full text-white" />
                <button class="px-4 rounded-r-lg font-bold text-white" style="background-color: {theme().primary}">OK</button>
            </div>
        </div>
    </div>
    
    <div class="text-center mt-12 pt-8 border-t border-white/10 opacity-30 text-xs">
        © {year} Le Gourmet Moderne. Développé par Allomoh.
    </div>
</footer>