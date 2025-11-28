<script>
    import HeroParallax from '$lib/components/HeroParallax.svelte';
    import MenuSection from '$lib/components/MenuSection.svelte';
    // import Customizer from '$lib/components/Customizer.svelte';
    import ReservationForm from '$lib/components/ReservationForm.svelte';
    import AdminDashboard from '$lib/components/AdminDashboard.svelte';
    import AuthModal from '$lib/components/ui/AuthModal.svelte';
    import CartSidebar from '$lib/components/ui/CartSidebar.svelte';
    import UserBar from '$lib/components/ui/UserBar.svelte';
    import Chatbot from '$lib/components/ui/Chatbot.svelte';
    import Footer from '$lib/components/ui/Footer.svelte';

    let isCartOpen = false;
</script>

<main class="bg-gray-950 min-h-screen text-slate-900 dark:text-white font-sans selection:bg-orange-500 selection:text-white">
    <!-- <Customizer /> -->
    <AuthModal />
    <UserBar />
    <AdminDashboard />
    <Chatbot />
    
    <CartSidebar isOpen={isCartOpen} onClose={() => isCartOpen = false} />
    
    <button 
        class="fixed top-6 right-6 z-30 p-3 bg-white text-black rounded-full shadow-xl"
        on:click={() => isCartOpen = true}
    >
        🛒
    </button>

    <HeroParallax />
    <MenuSection />
    <ReservationForm />
    <Footer />
</main>
