import styles from '../../styles/Login.module.css'
import { useLogin } from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'

function LoginForm() {
	const { register, handleSubmit, reset} = useForm()
	const { login, isLoading } = useLogin()

	function onSubmit(data) {
		const { email, password } = data
		
		if (!email || !password) return
		login(
			{ email, password },
			{
				onSettled: () => {
					reset()
				}
			}
		)
	}
 
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles['login-form']}>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="email">Email</label>
				<input className={styles.input} id='email' type="email" autoComplete='username' {...register('email')}  placeholder='Email'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="password">Password</label>
				<input className={styles.input} id='password' type="password" autoComplete='current-password' {...register('password')} placeholder='Password'/>
			</div>

			<button type='submit' className={styles.button}>Log In</button>
			
		</form>
	)
}

export default LoginForm
