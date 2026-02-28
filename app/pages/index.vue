<script setup>
import { onMounted } from 'vue'
const router = useRouter()

onMounted(() => {
	const user = localStorage.getItem('user') || localStorage.getItem('token')
	if (user) {
		router.replace('/dashboard')
	} else {
		router.replace('/login')
	}
})

</script>