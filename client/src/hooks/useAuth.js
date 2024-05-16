import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupApi } from '../api/apiAuth.js'
import { login as loginApi } from '../api/apiAuth.js';
import { logout as logoutApi } from '../api/apiAuth.js'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useUserContext } from '../contexts/UserProvider';

export function useSignup() {
	const {userDispatch} = useUserContext()
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { mutate: signup, isLoading } = useMutation({
		mutationFn: signupApi,
		onError: (error) => {
			console.log(error.message)
      toast.error(error.message)
    },
		onSuccess: async (data) => {
			// console.log('DATA HERE!!!:', data)
			userDispatch({type: 'HANDLE_PASS_USER_ID', payload: data.id})
			queryClient.invalidateQueries({ queryKey: ['userData'] });
			navigate('/home', { replace: true })
			toast.success('Successfully created user!')
		}
	})
 
	return {signup, isLoading}
}

export function useLogin() {
  const { userDispatch } = useUserContext()
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password}) => loginApi({ email, password }),
		onError: (err) => {
      toast.error(err.message)
    },
    onSuccess: (data) => {
      // console.log('Data received from login:', data);
      userDispatch({type: 'HANDLE_PASS_USER_ID', payload: data.id})
			queryClient.invalidateQueries({ queryKey: ['userData'] });
      toast.success('User successfully logged in!')
      // queryClient.setQueryData('username', data.username)
      navigate('/home', { replace: true })
    }
  });

  return { login, isLoading }
}

export function useLogout() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries()
			navigate('/login', { replace: true })
		}
	})
	return { logout, isLoading }
}

