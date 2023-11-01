import { useState } from 'react';
import { registerUser } from '../utilities/utils';
import { useRouter } from 'next/navigation';

const useRegister = () => {
  const router = useRouter();
  const [user] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");
  const [error, setError] = useState("");

  const handleRegister = async (registerData: UserData) => {
    setLoading(true);
    setError("");

    const registrationResult = await registerUser(registerData);

    if (registrationResult.success) {
      setMessage(registrationResult.success);

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      setError(registrationResult.error);
    }

    setLoading(false);
  };

  return { handleRegister, user, message, loading, error };
};

export default useRegister;

