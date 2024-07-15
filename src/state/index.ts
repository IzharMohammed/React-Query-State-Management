import { useQuery, useQueryClient } from "@tanstack/react-query";

/*
Analyzing code flow :- 
Summary of the Lines :-
Updating Data: queryClient.setQueriesData({ queryKey: [queryKey] }, newData);

This updates the data in the React Query cache for the specified query key with the new data provided.
Invalidating Queries: queryClient.invalidateQueries({ queryKey: [queryKey] });

This marks the specified queries as stale, indicating that they should be refetched the next time they are accessed.
Refetching Queries: queryClient.refetchQueries({ queryKey: [queryKey] });

This manually triggers a refetch of the specified queries, ensuring the data is up-to-date.
Example Flow
Setting Data: When setData is called with new data, queryClient.setQueriesData updates the cache with the new data for the specified query key.
Invalidating Data: When resetData is called, queryClient.invalidateQueries marks the query as stale, ensuring it will be refetched.
Refetching Data: Immediately after invalidating the query, queryClient.refetchQueries is called to refetch the data, ensuring it is up-to-date.
These methods together allow you to manage the data in the React Query cache effectively, ensuring that your components always have access to the latest data.
*/

export function createGlobalState<T>(
    queryKey: unknown,
    initialData: T | null = null
) {
    // Returns a custom hook to manage global state
    return function () {
        const queryClient = useQueryClient();

        // Use React Query's useQuery to manage the state with the provided queryKey and initialData
        const { data } = useQuery({
            queryKey: [queryKey], // Wraps the queryKey in an array
            queryFn: () => Promise.resolve(initialData), // Returns initialData as a resolved promise
            refetchInterval: false, // Disables periodic refetching
            refetchOnMount: false, // Disables refetching when component mounts
            refetchOnWindowFocus: false, // Disables refetching on window focus
            refetchOnReconnect: false, // Disables refetching on network reconnect
            refetchIntervalInBackground: false, // Disables background refetching
        });
    
        // Function to update the state data
        function setData(newData: Partial<T>) {
            queryClient.setQueriesData({ queryKey: [queryKey] }, newData); // Updates the cache with the new data
        }
    
        // Function to reset the state data
        function resetData() {
            queryClient.invalidateQueries({
                queryKey: [queryKey], // Invalidates the query, marking it as stale
            });
            queryClient.refetchQueries({
                queryKey: [queryKey], // Triggers a refetch of the query to get up-to-date data
            });
        } 
    
        // Return the current data, setData, and resetData functions
        return { data, setData, resetData };
    };
}
