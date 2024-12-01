import { type ComboBoxValue } from "./comboBox";
import type {
  Author,
  Branch,
  City,
  Genre,
  Publisher,
} from "@/types/inventoryServiceTypes";
import SearchForm from "./searchForm";
import { INVENTORY_API } from "@/lib/apiEndPoint";

async function getDropdownValues() {
  // Fetch data from an external API
  const [genresRes, authorsRes, publishersRes, citiesRes, branchesRes] =
    await Promise.all([
      fetch(INVENTORY_API + "genres"),
      fetch(INVENTORY_API + "authors"),
      fetch(INVENTORY_API + "publishers"),
      fetch(INVENTORY_API + "cities"),
      fetch(INVENTORY_API + "branches"),
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
    Genre[],
    Author[],
    Publisher[],
    City[],
    Branch[],
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
  const genreComboBoxValues: ComboBoxValue[] = genres.map((genre: Genre) => ({
    value: String(genre.id),
    label: genre.genre,
  }));
  genreComboBoxValues.unshift({ value: "", label: "All genres" });

  const authorsComboBoxValues: ComboBoxValue[] = authors.map(
    (author: Author) => ({
      value: String(author.id),
      label: author.name,
    }),
  );
  authorsComboBoxValues.unshift({ value: "", label: "All authors" });

  const publishersComboBoxValues: ComboBoxValue[] = publishers.map(
    (publisher: Publisher) => ({
      value: String(publisher.id),
      label: publisher.name,
    }),
  );
  publishersComboBoxValues.unshift({ value: "", label: "All publishers" });
  console.log(genreComboBoxValues);

  const citiesComboBoxValues: ComboBoxValue[] = cities.map((city: City) => ({
    value: String(city.id),
    label: city.city,
  }));
  citiesComboBoxValues.unshift({ value: "", label: "All cities" });

  const branchesSearchFormValues: {
    id: number;
    name: string;
    cityId: number;
  }[] = branches.map((branch: Branch) => ({
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
