import { ComboBox, type ComboBoxValue } from "./comboBox";
import type {
  GenreResponse,
  AuthorResponse,
  PublisherResponse,
  CityResponse,
  BranchResponse,
} from "@/types/inventoryServiceTypes";
import SearchForm from "./searchForm";

async function getDropdownValues() {
  // Fetch data from an external API
  const [genresRes, authorsRes, publishersRes, citiesRes, branchesRes] =
    await Promise.all([
      fetch("http://localhost:3003/api/genres"),
      fetch("http://localhost:3003/api/authors"),
      fetch("http://localhost:3003/api/publishers"),
      fetch("http://localhost:3003/api/cities"),
      fetch("http://localhost:3003/api/branches"),
    ]);

  if (
    !genresRes.ok ||
    !authorsRes.ok ||
    !publishersRes.ok ||
    !citiesRes.ok ||
    !branchesRes.ok
  ) {
    throw new Error("Failed to fetch data");
  }

  const [genres, authors, publishers, cities, branches]: [
    GenreResponse[],
    AuthorResponse[],
    PublisherResponse[],
    CityResponse[],
    BranchResponse[],
  ] = await Promise.all([
    genresRes.json(),
    authorsRes.json(),
    publishersRes.json(),
    citiesRes.json(),
    branchesRes.json(),
  ]);
  // Pass the data to the page component as props
  return { genres, authors, publishers, cities, branches };
}

export default async function MediaSearchPage() {
  const { genres, authors, publishers, cities, branches } =
    await getDropdownValues();
  const genreComboBoxValues: ComboBoxValue[] = genres.map(
    (genre: GenreResponse) => ({
      value: String(genre.id),
      label: genre.genre,
    }),
  );
  genreComboBoxValues.unshift({ value: "", label: "All genres" });

  const authorsComboBoxValues: ComboBoxValue[] = authors.map(
    (author: AuthorResponse) => ({
      value: String(author.id),
      label: author.name,
    }),
  );
  authorsComboBoxValues.unshift({ value: "", label: "All authors" });

  const publishersComboBoxValues: ComboBoxValue[] = publishers.map(
    (publisher: PublisherResponse) => ({
      value: String(publisher.id),
      label: publisher.name,
    }),
  );
  publishersComboBoxValues.unshift({ value: "", label: "All publishers" });
  console.log(genreComboBoxValues);

  const citiesComboBoxValues: ComboBoxValue[] = cities.map(
    (city: CityResponse) => ({
      value: String(city.id),
      label: city.city,
    }),
  );
  citiesComboBoxValues.unshift({ value: "", label: "All cities" });

  const branchesSearchFormValues: {
    id: number;
    name: string;
    cityId: number;
  }[] = branches.map((branch: BranchResponse) => ({
    id: branch.id,
    name: branch.name,
    cityId: branch.City.id,
  }));
  return (
    <SearchForm
      genres={genreComboBoxValues}
      authors={authorsComboBoxValues}
      publishers={publishersComboBoxValues}
      cities={citiesComboBoxValues}
      branches={branchesSearchFormValues}
    />
  );
}
