import { ref } from "vue";

export function usePatch({ url, method = 'PATCH', data }) {
    const results = ref(null);

    async function fetchJsonPost(body) {
        const res = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        results.value = json;
    }

    fetchJsonPost(data);
    return { results, fetchJsonPost };
}