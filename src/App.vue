<script setup>
import { RouterLink, RouterView } from "vue-router";
import "./index.css";
import { getWeather } from "./api";

import { onMounted, reactive } from "vue";

const state = reactive({
	isLoading: true,
	name: "London",
	response: {
		current: {
			temp_c: "",
			condition: {
				text: "",
				icon: "",
			},
		},
	},
});

const f = async (e) => {
	e.preventDefault();
	state.isLoading = true;
	const { data } = await getWeather(state.name);
	state.response = data;
	state.response.current.condition.icon =
		"https:" + state.response.current.condition.icon;
	state.isLoading = false;
	console.log(state.isLoading);
};

onMounted(async () => {
	state.isLoading = true;
	const { data } = await getWeather(state.name);
	state.response = data;
	state.response.current.condition.icon =
		"https:" + state.response.current.condition.icon;
	state.isLoading = false;
	console.log(state.isLoading);
});
</script>

<template>
	<main class="w-screen h-screen flex justify-center items-center">
		<div
			v-if="!state.isLoading"
			class="w-full h-full flex justify-center items-center"
		>
			<form class="p-2 w-full md:w-1/3 flex flex-col gap-3">
				<input
					:value="state.name"
					@input="(e) => (state.name = e.target.value)"
					type="text"
					placeholder="name of a city..."
					class="p-2 border border-red-500 rounded-md"
				/>
				<img
					class="w-1/3 mx-auto"
					v-bind:src="state.response.current.condition.icon"
					alt="Weather icon"
				/>
				<h1 class="w-full text-center">
					{{ state.response.current.temp_c }} C˚
					{{ state.response.current.condition.text }}
				</h1>

				<button
					type="submit"
					@click="f"
					class="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 font-light shadow-md"
				>
					Search
				</button>
			</form>
		</div>
		<div v-else>
			<h1>loading...</h1>
		</div>
	</main>
</template>
