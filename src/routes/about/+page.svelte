<svelte:head>
	<title>About | Raymond Li</title>
	<meta name="description" content="Learn more about Raymond Li, a Computer Science and Mathematics major at the University of British Columbia (UBC) passionate about technology and problem-solving. Discover my professional background, academic achievements, skills, and interests.">
</svelte:head>

<script>
	import Link from '$lib/ui/shared/link.svelte';
</script>

<section class="py-16 md:py-24">
	<h1 class="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h1>
	<div class="max-w-4xl mx-auto bg-gray-800 p-8 md:p-12 rounded-xl shadow-xl border border-gray-700">
		<div class="space-y-6 text-lg text-gray-300 leading-relaxed">
			<p>
				Hi! I'm Raymond Li, and I'm a software developer and a <span class="text-blue-400 font-semibold">BSc Combined Major in Computer Science and Mathematics</span> student at the University of British Columbia from Calgary, AB.
			</p>
			
			<p>
				In my academic coursework, I've completed Computer Science courses covering Models of Computation, Data Structures and Algorithms, Computer Systems, and Software Construction; and I've completed Mathematics courses covering Calculus I, II, and III, Linear Algebra, and Mathematical Proofs.
			</p>
			
			<p>
				In addition to academics, I have experience participating in programming contests such as Waterloo's Canadian Computing Competition, the USA Computing Olympiad, and Google Kickstart; game jams such as <Link href="https://sabishi-angel.itch.io/jankbot" newtab>Global Game Jam Vancouver</Link>; and Capture the Flag (CTF) cybersecurity competitions such as jellyCTF.
			</p>
			
			<p>
				I also enjoy exploring ways to apply math and computer science concepts to real programming problems. For example, in my game development project for a <Link href="https://github.com/liraymond04/olc-rts" newtab>pixel-art style 2.5D RTS</Link>, I applied linear algebra and affine transformations to render a 3D-like hexagonal grid and handle interactions with a hexagonal coordinate system.
			</p>
			
			<p>
				I have experience writing real software and designing complex systems, as shown in my <Link href="https://github.com/liraymond04/game-engine" newtab>game engine</Link> project. I used the composition pattern with dependency injection to handle scene loading with dynamic libraries, and designed a hooks and events API for easily extending and modding the engine through injecting run-time hooks and signing event calls.
			</p>
			
			<p>
				This game engine project also used data structures and algorithms such as trees and DFS for recursively loading Lua mods and their dependencies, and designing the engine around Lua mods allowed for fast-iteration through hot-reloading, which allowed for seeing changes to code update in real-time without compilation.
			</p>
			
			<p>
				I have passion and believe in free and open source software, I use Linux (Arch btw) and Neovim, and enjoy contributing and supporting FOSS projects that I use a lot, whether its game-modding tools such as <Link href="https://github.com/AurieFramework/Aurie" newtab>Aurie and YYToolkit</Link> or programmatic animation software like <Link href="https://github.com/motion-canvas/motion-canvas" newtab>Motion Canvas</Link>.
			</p>
		</div>
	</div>
</section>
