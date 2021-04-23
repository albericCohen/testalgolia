import {
  Component,
  Inject,
  forwardRef,
  Output,
  EventEmitter
} from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";
import { connectAutocomplete } from "instantsearch.js/es/connectors";

@Component({
  selector: "app-autocomplete",
  template: `
    <div>
      <input
        matInput
        [matAutocomplete]="auto"
        (input)="handleChange($event)"
        style="width: 100%; padding: 10px"
      />
      <input
        type="submit"
        (click)="onQuerySuggestionClick.emit({ query: query })"
      />
      <mat-autocomplete
        #auto="matAutocomplete"
        autoActiveFirstOption
        style="margin-top: 30px; max-height: 600px"
        (optionSelected)="
          onQuerySuggestionClick.emit({ query: $event.option.value })
        "
      >
        <div *ngFor="let index of state.indices || []">
          <mat-option
            *ngFor="let option of index.hits"
            [value]="option.libelle"
            (click)="onQuerySuggestionClick.emit({ query: option.libelle })"
          >
            {{ option.libelle }}
          </mat-option>
        </div>
      </mat-autocomplete>
    </div>
  `
})
export class AutocompleteComponent extends BaseWidget {
  state: {
    query: string;
    refine: Function;
    indices: object[];
  };
  query: string;
  @Output() onQuerySuggestionClick = new EventEmitter<{ query: string }>();

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super("AutocompleteComponent");
  }

  public handleChange($event: KeyboardEvent) {
    this.query = ($event.target as HTMLInputElement).value;
    this.state.refine(($event.target as HTMLInputElement).value);
  }

  public ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();
  }
}
