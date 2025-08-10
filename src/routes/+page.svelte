<script>
	import Social from '$lib/ui/social/social.svelte';
</script>

<svelte:head>
	<title>liraymond04</title>
	<meta
		name="description"
		content="Welcome to Raymond Li's personal site, a Computer Science and Mathematics major at the University of British Columbia (UBC). Discover my latest projects, professional background, blog posts, and insights. Explore my portfolio, connect with me, and learn more about my passions and expertise."
	/>
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 mt-12">
	<!-- Hero Section -->
	<section id="hero" class="text-center py-8 md:py-24">
		<div class="flex flex-col items-center">
			<!-- svelte-ignore a11y_img_redundant_alt -->
			<img
				src="./images/pfp.jpg"
				alt="Profile Picture"
				class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-400 mb-6 object-cover shadow-lg"
			/>
			<h1 class="text-4xl md:text-6xl font-extrabold text-white mb-2">
				Hello, I'm <span
					class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
					>Raymond Li</span
				>.
			</h1>
			<p class="text-lg md:text-2xl text-gray-400 mb-8">
				A Computer Science and Mathematics student passionate about building software.
			</p>
			<div class="flex space-x-4">
				<Social size={32} />
			</div>
		</div>
	</section>

	<!-- About Me Section -->
	<section id="about" class="py-8 md:py-24">
		<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
		<div class="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700">
			<p class="text-lg text-gray-300 leading-relaxed text-justify">
				I'm a BSc Combined Major in Computer Science and Mathematics student at the University of
				British Columbia from Calgary, AB. I have a strong foundation in data structures,
				algorithms, and software design principles. My passion lies in building scalable and
				efficient applications, game development, and exploring the intersection of mathematics and
				computer science.
			</p>
		</div>
	</section>

	<!-- Projects Section -->
	<section id="projects" class="py-8 md:py-24">
		<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">My Projects</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- Game Engine Project -->
			<div
				class="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-transform duration-150 hover:scale-105"
			>
				<div class="p-6">
					<h3 class="text-xl font-bold text-white mb-2">Game Engine</h3>
					<p class="text-sm text-gray-400 mb-4">
						A modular game engine with composition pattern, dependency injection, and Lua scripting
						support for hot-reloading.
					</p>
					<div class="flex flex-wrap gap-2 mb-4">
						<span class="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
							>C++</span
						>
						<span class="bg-yellow-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
							>Lua</span
						>
						<span class="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
							>OpenGL</span
						>
					</div>
					<div class="flex space-x-4">
						<a
							href="https://github.com/liraymond04/game-engine"
							class="text-purple-400 hover:text-purple-500 transition-colors duration-150"
							aria-label="GitHub Repository"
						>
							<i class="fab fa-github"></i> GitHub
						</a>
					</div>
				</div>
			</div>

			<!-- RTS Game Project -->
			<div
				class="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-transform duration-150 hover:scale-105"
			>
				<div class="p-6">
					<h3 class="text-xl font-bold text-white mb-2">Pixel-Art 2.5D RTS</h3>
					<p class="text-sm text-gray-400 mb-4">
						A real-time strategy game with hexagonal grid system using linear algebra and affine
						transformations.
					</p>
					<div class="flex flex-wrap gap-2 mb-4">
						<span class="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
							>C++</span
						>
						<span class="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
							>Linear Algebra</span
						>
						<span class="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
							>Game Dev</span
						>
					</div>
					<div class="flex space-x-4">
						<a
							href="https://github.com/liraymond04/olc-rts"
							class="text-purple-400 hover:text-purple-500 transition-colors duration-150"
							aria-label="GitHub Repository"
						>
							<i class="fab fa-github"></i> GitHub
						</a>
					</div>
				</div>
			</div>

			<!-- Personal Website -->
			<div
				class="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 transition-transform duration-150 hover:scale-105"
			>
				<div class="p-6">
					<h3 class="text-xl font-bold text-white mb-2">Personal Portfolio</h3>
					<p class="text-sm text-gray-400 mb-4">
						A modern, responsive portfolio website built with SvelteKit and Tailwind CSS.
					</p>
					<div class="flex flex-wrap gap-2 mb-4">
						<span class="bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
							>SvelteKit</span
						>
						<span class="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
							>TypeScript</span
						>
						<span class="bg-cyan-600 text-white text-xs font-semibold px-2 py-1 rounded-full"
							>Tailwind CSS</span
						>
					</div>
					<div class="flex space-x-4">
						<a
							href="/"
							class="text-blue-400 hover:text-blue-500 transition-colors duration-150"
							aria-label="Live Demo"
						>
							<i class="fas fa-external-link-alt"></i> Live Demo
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section id="skills" class="py-8 md:py-24">
		<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Skills</h2>
		<div class="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				C++
			</div>
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				Python
			</div>
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				JavaScript
			</div>
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				TypeScript
			</div>
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				SvelteKit
			</div>
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				Lua
			</div>
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				Linux
			</div>
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				Git
			</div>
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				Tailwind CSS
			</div>
			<div
				class="bg-gray-800 text-gray-300 px-6 py-3 rounded-full shadow-lg border border-gray-700 text-lg transition-transform duration-150 hover:scale-105"
			>
				OpenGL
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section id="contact" class="py-8 md:py-24">
		<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
		<div class="max-w-2xl mx-auto text-center">
			<p class="text-lg text-gray-300 mb-8">
				I'm currently seeking new opportunities and would love to connect. Feel free to reach out!
			</p>
			<div class="flex flex-col sm:flex-row justify-center items-center gap-4">
				<a
					href="mailto:liraymond04@gmail.com"
					class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-150 shadow-lg"
				>
					Send an Email
				</a>
				<a
					href="/resume"
					class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-150 shadow-lg"
				>
					View Resume
				</a>
			</div>
		</div>
	</section>
</div>
