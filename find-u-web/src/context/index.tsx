import { MoviesProvider } from "./movies"

export default function Contexts({ children }: any) {
  return <MoviesProvider>{children}</MoviesProvider>
}
