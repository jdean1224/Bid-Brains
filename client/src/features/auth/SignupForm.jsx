import styles from '../../styles/Signup.module.css'
import { useForm } from 'react-hook-form'
import { useSignup } from '../../hooks/useAuth'

function SignupForm() {
	const { register, handleSubmit, reset } = useForm()
	const { signup, isLoading } = useSignup()
	
	const onSubmit = (data) => {
		const {email, username, password, passwordConfirm} = data
		if (!email || !password || password !== passwordConfirm) {
			alert('Please fill in all fields and make sure passwords match.')
			return
		}
		signup(data,
			{
				onSettled: (data) => {
					reset(),
					console.log('formData:', data)
					console.log('username', username)
				}
			}
		)
	}
  
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles['signup-form']}>
			
			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="username">Create username</label>
				<input className={styles.input} id='username' type="text" {...register('username')} placeholder='Choose a username' autoComplete='off'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="email">Email</label>
				<input className={styles.input} id='email' type="email" {...register('email')} placeholder='Add your email' autoComplete='off'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="password">Create password</label>
				<input className={styles.input} id='password' type="password" {...register('password')} placeholder='Choose a password' autoComplete='new-password'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="passwordConfirm">Confirm password</label>
				<input className={styles.input} id='passwordConfirm' type="password" {...register('passwordConfirm')} placeholder='Confirm password' autoComplete='new-password'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="fullName">Full name</label>
				<input className={styles.input} id='fullName' type="text" {...register('fullName')} placeholder='Full name'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="streetAddress">Street Address</label>
				<input className={styles.input} id='streetAddress' type="text" {...register('streetAddress')} placeholder='Street Address'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="streetAddress2">Street Address two</label>
				<input className={styles.input} id='streetAddress2' type="text" {...register('streetAddress2')} placeholder='Street Address two'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="city">City</label>
				<input className={styles.input} id='city' type="text" {...register('city')} placeholder='City'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="state">State</label>
				<input className={styles.input} id='state' type="text" {...register('state')} placeholder='State'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="zipCode">Zip Code</label>
				<input className={styles.input} id='zipCode' type="text" {...register('zipCode')} placeholder='Zip Code'/>
			</div>

			<div className={styles.formItem}>
				<label className={styles.label} htmlFor="phoneNumber">Phone number</label>
				<input className={styles.input} id='phoneNumber' type="text" {...register('phoneNumber')} placeholder='Phone Number'/>
			</div>

			<button className={styles.button}>Submit</button>
			
		</form>
	)
}

export default SignupForm
