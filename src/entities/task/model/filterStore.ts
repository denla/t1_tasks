import { makeAutoObservable } from "mobx";

class FilterStore {
  category: string = "All";
  status: string = "All";
  priority: string = "All";
  search: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  setCategory(category: string) {
    this.category = category;
  }
  setStatus(status: string) {
    this.status = status;
  }

  setPriority(priority: string) {
    this.priority = priority;
  }
  setSearch(value: string) {
    this.search = value;
  }

  clearFilters() {
    this.category = "All";
    this.status = "All";
    this.priority = "All";
    this.search = "";
  }
}

export const filterStore = new FilterStore();
