import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../config/api';

export const useApi = () => {
  const queryClient = useQueryClient();

  const fetcher = async ({ url, method = 'GET', data = null }) => {
    try {
      const response = await api({
        url,
        method,
        data,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const useApiQuery = (key, url, options = {}) => {
    return useQuery(
      key,
      () => fetcher({ url }),
      {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
        ...options,
      }
    );
  };

  const useApiMutation = (url, options = {}) => {
    return useMutation(
      (data) => fetcher({ url, method: 'POST', data }),
      {
        ...options,
        onSuccess: (...args) => {
          // Invalidate and refetch queries after mutation
          if (options.invalidateQueries) {
            const queriesToInvalidate = Array.isArray(options.invalidateQueries)
              ? options.invalidateQueries
              : [options.invalidateQueries];

            queriesToInvalidate.forEach((query) => {
              queryClient.invalidateQueries(query);
            });
          }

          if (options.onSuccess) {
            options.onSuccess(...args);
          }
        },
      }
    );
  };

  const useApiUpdate = (url, options = {}) => {
    return useMutation(
      (data) => fetcher({ url, method: 'PUT', data }),
      {
        ...options,
        onSuccess: (...args) => {
          if (options.invalidateQueries) {
            const queriesToInvalidate = Array.isArray(options.invalidateQueries)
              ? options.invalidateQueries
              : [options.invalidateQueries];

            queriesToInvalidate.forEach((query) => {
              queryClient.invalidateQueries(query);
            });
          }

          if (options.onSuccess) {
            options.onSuccess(...args);
          }
        },
      }
    );
  };

  const useApiDelete = (url, options = {}) => {
    return useMutation(
      () => fetcher({ url, method: 'DELETE' }),
      {
        ...options,
        onSuccess: (...args) => {
          if (options.invalidateQueries) {
            const queriesToInvalidate = Array.isArray(options.invalidateQueries)
              ? options.invalidateQueries
              : [options.invalidateQueries];

            queriesToInvalidate.forEach((query) => {
              queryClient.invalidateQueries(query);
            });
          }

          if (options.onSuccess) {
            options.onSuccess(...args);
          }
        },
      }
    );
  };

  const useInfiniteApiQuery = (key, url, options = {}) => {
    return useQuery(
      key,
      async ({ pageParam = 1 }) => {
        const response = await fetcher({
          url: `${url}?page=${pageParam}`,
        });
        return response;
      },
      {
        getNextPageParam: (lastPage) =>
          lastPage.current_page < lastPage.last_page
            ? lastPage.current_page + 1
            : undefined,
        ...options,
      }
    );
  };

  return {
    useApiQuery,
    useApiMutation,
    useApiUpdate,
    useApiDelete,
    useInfiniteApiQuery,
  };
};

export default useApi; 