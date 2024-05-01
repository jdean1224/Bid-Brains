import styles from '../styles/Login.module.css'
import LoginForm from '../features/auth/LoginForm'

function LoginPage() {
	return (
		<section className={styles['login-page']}>
		
			<LoginForm/>

		</section>
	)
}

export default LoginPage
