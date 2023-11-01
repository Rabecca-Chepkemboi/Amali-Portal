import { useState } from 'react';
import { loginUser } from '../utilities/utils';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useLogin = () => {
  const router = useRouter();
  const [user] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const handleLogin = async (loginData: LoginData) => {
    setLoading(true);
    setError("");

    const loginResult = await loginUser(loginData);

    if (loginResult.success) {
      Cookies.set('loginToken', loginResult.result.token);
      setMessage(loginResult.success);

      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    } else {
      setError(loginResult.error);
    }

    setLoading(false);
  };

  return { handleLogin, user, message, loading, error };
};

export default useLogin;
