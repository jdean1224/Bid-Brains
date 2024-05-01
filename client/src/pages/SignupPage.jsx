import styles from '../styles/Signup.module.css'
import SignupForm from '../features/auth/SignupForm'

function SignupPage() {
	return (
		<section className={styles['signup-page']}>

			<SignupForm/>
			
		</section>
	)
}

export default SignupPage
