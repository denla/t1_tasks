// import { makeAutoObservable } from "mobx";

// class FilterStore {
//   categories: string[] = [];
//   statuses: string[] = [];
//   priorities: string[] = [];
//   search: string = "";

//   constructor() {
//     makeAutoObservable(this);
//   }

//   toggleCategory(category: string) {
//     if (this.categories.includes(category)) {
//       this.categories = this.categories.filter((c) => c !== category);
//     } else {
//       this.categories.push(category);
//     }
//   }

//   toggleStatus(status: string) {
//     if (this.statuses.includes(status)) {
//       this.statuses = this.statuses.filter((s) => s !== status);
//     } else {
//       this.statuses.push(status);
//     }
//   }

//   togglePriority(priority: string) {
//     if (this.priorities.includes(priority)) {
//       this.priorities = this.priorities.filter((p) => p !== priority);
//     } else {
//       this.priorities.push(priority);
//     }
//   }

//   setSearch(value: string) {
//     this.search = value;
//   }

//   clearFilters() {
//     this.categories = [];
//     this.statuses = [];
//     this.priorities = [];
//     this.search = "";
//   }
// }

// export const filterStore = new FilterStore();

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
