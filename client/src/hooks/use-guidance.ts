import { useMutation } from "@tanstack/react-query";
import { api, type InsertSearch } from "@shared/routes";
import { z } from "zod";

// Type inference from the route definition
type SearchResponse = z.infer<typeof api.guidance.search.responses[200]>;
type SearchInput = z.infer<typeof api.guidance.search.input>;

export function useGuidanceSearch() {
  return useMutation({
    mutationFn: async (data: SearchInput) => {
      // Validate input before sending using the shared schema
      const validated = api.guidance.search.input.parse(data);

      const res = await fetch(api.guidance.search.path, {
        method: api.guidance.search.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.guidance.search.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to fetch guidance results");
      }

      // Parse response with Zod for type safety
      return api.guidance.search.responses[200].parse(await res.json());
    },
  });
}
