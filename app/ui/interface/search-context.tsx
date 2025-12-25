"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Suspense,
} from "react";
import { useSearchParams } from "next/navigation";
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const SearchContext = createContext<SearchContextType | undefined>(undefined);

function UrlSync({
  setSelectedTag,
}: {
  setSelectedTag: (tag: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  useEffect(() => {
    setSelectedTag(tag);
  }, [tag, setSelectedTag]);

  return null;
}
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedTag,
        setSelectedTag,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      <Suspense fallback={null}>
        <UrlSync setSelectedTag={setSelectedTag} />
      </Suspense>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
