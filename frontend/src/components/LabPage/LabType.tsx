export type LabGraphType = {
  keyword: string;
  lastDate: {x: number, y: number};
  line: {x: number, y: number}[];
  scatter: {x: number, y: number}[];
};

export type LabRegressionType = {
  keyword: string;
  coefficient: number;
}

export type ChangeType = "increase" | "decrease" | "noChange";