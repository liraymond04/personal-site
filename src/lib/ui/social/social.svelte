<script lang="ts">
	import SocialIcons from '@rodneylab/svelte-social-icons';

	export let size = 48;
</script>

<div class="grid grid-flow-col gap-4">
	<a href="https://linkedin.com/in/liraymond04" target="_blank">
		<SocialIcons
			network="linkedin"
			fgColor="#A6ADBA"
			bgColor="#FF000000"
			width={size}
			height={size}
		/>
	</a>
	<a href="https://github.com/liraymond04" target="_blank">
		<SocialIcons
			network="github"
			fgColor="#A6ADBA"
			bgColor="#FF000000"
			width={size}
			height={size}
		/>
	</a>
	<a href="mailto:li.raymond04@gmail.com" target="_blank">
		<SocialIcons network="email" fgColor="#A6ADBA" bgColor="#FF000000" width={size} height={size} />
	</a>
</div>
