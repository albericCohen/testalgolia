import { Component } from "@angular/core";
import * as algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "Y6Z4MB7MBD",
  "c473d840b596c78b8582e32e1b54563f"
);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  config = {
    indexName: "ima_prestations-DEV",
    searchClient
  };

  public searchParameters = {
    query: ""
  };

  public setQuery({ query }: { query: string }) {
    this.searchParameters.query = query;
    console.log(query);
  }
}
