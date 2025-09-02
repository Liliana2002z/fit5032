import { ref } from 'vue';

const isAuthenticated = ref(false);

export const useAuth = () => {
  const login = (username, password) => {
    if (username === 'user' && password === 'password') {
      isAuthenticated.value = true;
      return true;
    }
    return false;
  };

  const logout = () => {
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};