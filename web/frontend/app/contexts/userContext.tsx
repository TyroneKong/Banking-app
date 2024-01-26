import { useContext, createContext, PropsWithChildren, useMemo } from 'react';
import { User } from 'app/types/user';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { axiosRequest } from 'app/requests/requests';

const userContext = createContext({} as User);

export function UserContextProvider({ children }: PropsWithChildren) {
  const { data } = useQuery<UseQueryResult<User>>({
    queryKey: ['me'],
    queryFn: () => axiosRequest.get('/api/currentUser'),
  });

  const value = useMemo(() => {
    return {
      ...data?.data,
    };
  }, [data])

  
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

const useUser = (): User => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error('user context needs to be wrappped by a provider');
  }
  return context;
};

export default useUser;
